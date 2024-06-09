package com.withSchool.service.billing;

import com.withSchool.dto.payment.ResPaymentRecordDTO;
import com.withSchool.entity.payment.PaymentFail;
import com.withSchool.entity.payment.PaymentRecord;
import com.withSchool.entity.payment.Subscription;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.repository.payment.PaymentFailRepository;
import com.withSchool.repository.payment.PaymentRecordRepository;
import com.withSchool.repository.payment.SubscriptionRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.service.user.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BillingService {
    private final SubscriptionRepository subscriptionRepository;
    private final SchoolInformationRepository schoolInformationRepository;
    private final PaymentRecordRepository paymentRecordRepository;
    private final PaymentFailRepository paymentFailRepository;
    private final RestTemplate restTemplate;
    private final NotificationService notificationService;

    @Value("${portone.api.secret}")
    private String portOneApiSecret;

    private static final int BASIC_DAILY_RATE = 100000;
    private static final int INTERMEDIATE_DAILY_RATE = 150000;
    private static final int PREMIUM_DAILY_RATE = 200000;

    @Scheduled(cron = "20 55 1 * * ?",zone = "Asia/Seoul") // 매월 1일 0시 0분 0초에 실행
    @Transactional
    public void processMonthlyBilling() {
        List<Subscription> subscriptions = subscriptionRepository.findAll();

        for (Subscription subscription : subscriptions) {
            int amount = calculateAmount(subscription);
            if(amount <= 0) continue;
            try {
                processPayment(subscription, amount);
                subscription.setStartDate(LocalDate.now());
            } catch (Exception e) {
                handlePaymentFailure(subscription, e);
            }
        }
    }
    @Scheduled(cron = "0 * * * * ?",zone = "Asia/Seoul") // 매일 0시 0분 0초에 실행
    @Transactional
    public void retryFailedPayments() {
        LocalDate twoWeeksAgo = LocalDate.now().minusWeeks(2);

        List<PaymentFail> paymentFailList = paymentFailRepository.findAll();

        for (PaymentFail fail : paymentFailList) {
            Subscription subscription = fail.getSubscription();
            if (fail.getFailDate().isBefore(twoWeeksAgo) || fail.getAttempts() >= 14) {
                SchoolInformation schoolInformation = schoolInformationRepository.findById(subscription.getSchoolInformation().getSchoolId())
                        .orElseThrow(()->new RuntimeException("해당하는 학교가 없습니다"));
                schoolInformation.setPaymentState(0);
                schoolInformationRepository.save(schoolInformation);
                paymentFailRepository.delete(fail);
                subscriptionRepository.delete(subscription);
            } else {
                try {
                    int amount = calculateAmount(subscription);
                    processPayment(subscription, amount);
                    subscription.setStartDate(LocalDate.now().withDayOfMonth(1));
                    paymentFailRepository.delete(fail);
                } catch (Exception e) {
                    fail.setAttempts(fail.getAttempts() + 1);
                    fail.setFailReason(e.getMessage());
                    paymentFailRepository.save(fail);
                }
            }
        }
    }

    private int calculateAmount(Subscription subscription) {
        LocalDate now = LocalDate.now(); // 6.1
        LocalDate startDate = subscription.getStartDate(); // 5.9
        LocalDate endDate = subscription.getEndDate() != null ? subscription.getEndDate() : now.minusDays(1); //6.1

        long daysUsed = ChronoUnit.DAYS.between(startDate, endDate.plusDays(1));
        int dailyRate = getDailyRate(subscription.getPlan());

        return dailyRate * (int)daysUsed;
    }

    private int getDailyRate(int plan) {
        switch (plan) {
            case 0:
                return BASIC_DAILY_RATE;
            case 1:
                return INTERMEDIATE_DAILY_RATE;
            case 2:
                return PREMIUM_DAILY_RATE;
            default:
                return 9;
        }
    }
    private void processPayment(Subscription subscription, int amount) {

        String paymentId = UUID.randomUUID().toString();
        String url = "https://api.portone.io/payments/" + paymentId + "/billing-key";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "PortOne " + portOneApiSecret);
        headers.set("Content-Type", "application/json");

        Map<String, Object> paymentDetails = new HashMap<>();
        paymentDetails.put("billingKey", subscription.getBillingKey());
        paymentDetails.put("orderName", "월간 이용권 정기결제");

        Map<String, Object> amountDetails = new HashMap<>();
        amountDetails.put("total", amount);

        paymentDetails.put("amount", amountDetails);
        paymentDetails.put("currency", "KRW");

        PaymentRecord paymentRecord = PaymentRecord.builder()
                .paymentId(paymentId)
                .amount(amount)
                .paymentDate(LocalDateTime.now())
                .subscription(subscription)
                .success(false)
                .build();

        paymentRecordRepository.save(paymentRecord);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(paymentDetails, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        boolean success = response.getStatusCode().is2xxSuccessful();


        paymentRecord.setSuccess(success);

        paymentRecordRepository.save(paymentRecord);
        if(subscription.getEndDate() != null){
            subscriptionRepository.delete(subscription);
        }

    }
    private void handlePaymentFailure(Subscription subscription, Exception e) {

        PaymentFail paymentFail = PaymentFail.builder()
                .failDate(LocalDate.now())
                .failReason(e.getMessage().substring(0,20))
                .subscription(subscription)
                .build();

        paymentFailRepository.save(paymentFail);

        notificationService.sendPaymentFailure(paymentFail);

    }
    @Transactional
    @Scheduled(cron = "0 0 1 * * ?",zone = "Asia/Seoul")
    public void stopFreeVersion(){
        LocalDate now = LocalDate.now();
        LocalDate twoWeeksAge = now.minusWeeks(2);
        List<SchoolInformation> schoolInformationList = schoolInformationRepository.findAll();
        for(SchoolInformation s : schoolInformationList){
            if(s.getServiceType() == 9 && s.getRegDate().toLocalDate().isBefore(twoWeeksAge)){
                s.setPaymentState(0);
                schoolInformationRepository.save(s);
            }
        }
    }

    public List<ResPaymentRecordDTO> getPaymentRecord(Long schoolId) {
        List<ResPaymentRecordDTO> resPaymentRecordDTOList = new ArrayList<>();

        List<PaymentRecord> paymentRecordList = paymentRecordRepository.findAllBySchoolId(schoolId);
        for(PaymentRecord p : paymentRecordList){
            ResPaymentRecordDTO resPaymentRecordDTO = ResPaymentRecordDTO.builder()
                    .paymentId(p.getPaymentId())
                    .plan(p.getPlan())
                    .amount(p.getAmount())
                    .paymentDate(p.getPaymentDate())
                    .success(p.isSuccess())
                    .build();
            resPaymentRecordDTOList.add(resPaymentRecordDTO);
        }

        return resPaymentRecordDTOList;
    }
}