package com.withSchool.service.billing;

import com.withSchool.entity.payment.PaymentFail;
import com.withSchool.entity.payment.PaymentRecord;
import com.withSchool.entity.payment.Plan;
import com.withSchool.entity.payment.Subscription;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.repository.payment.PaymentFailRepository;
import com.withSchool.repository.payment.PaymentRecordRepository;
import com.withSchool.repository.payment.SubscriptionRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BillingService {
    private final SubscriptionRepository subscriptionRepository;
    private final SchoolInformationRepository schoolInformationRepository;
    private final PaymentRecordRepository paymentRecordRepository;
    private final PaymentFailRepository paymentFailRepository;
    private final RestTemplate restTemplate;

    @Value("${portone.api.secret}")
    private String portOneApiSecret;

    private static final double BASIC_DAILY_RATE = 100000;
    private static final double INTERMEDIATE_DAILY_RATE = 150000;
    private static final double PREMIUM_DAILY_RATE = 200000;

    @Scheduled(cron = "0 0 0 1 * ?") // 매월 1일 0시 0분 0초에 실행
    @Transactional
    public void processMonthlyBilling() {
        List<Subscription> subscriptions = subscriptionRepository.findAll();

        for (Subscription subscription : subscriptions) {
            if (subscription.getEndDate() != null && subscription.getEndDate().isBefore(LocalDate.now())) {
                SchoolInformation schoolInformation = schoolInformationRepository.findById(subscription.getSchoolInformation().getSchoolId())
                        .orElseThrow(()->new RuntimeException("해당하는 학교가 없습니다"));
                schoolInformation.setPaymentState(0);
                schoolInformationRepository.save(schoolInformation);
                continue;
            }

            double amount = calculateAmount(subscription);
            try {
                processPayment(subscription, amount);
            } catch (Exception e) {
                handlePaymentFailure(subscription, e);
            }
        }
    }
    @Scheduled(cron = "0 0 0 * * ?") // 매일 0시 0분 0초에 실행
    @Transactional
    public void retryFailedPayments() {
        LocalDate twoWeeksAgo = LocalDate.now().minusWeeks(2);
        List<PaymentFail> paymentFailList = paymentFailRepository.findAll();

        for (PaymentFail fail : paymentFailList) {
            Subscription subscription = fail.getSubscription();
            if (fail.getFailDate().isBefore(twoWeeksAgo)) {
                SchoolInformation schoolInformation = schoolInformationRepository.findById(subscription.getSchoolInformation().getSchoolId())
                        .orElseThrow(()->new RuntimeException("해당하는 학교가 없습니다"));
                schoolInformation.setPaymentState(0);
                schoolInformationRepository.save(schoolInformation);
            } else {
                double amount = calculateAmount(subscription);
                processPayment(subscription, amount);
                paymentFailRepository.delete(fail); // 성공 시 실패 로그 삭제
            }
        }
    }

    private double calculateAmount(Subscription subscription) {
        LocalDate now = LocalDate.now();
        LocalDate startDate = subscription.getStartDate();
        LocalDate endDate = subscription.getEndDate() != null ? subscription.getEndDate() : now;

        // 해당 월의 첫 날과 마지막 날을 구함
        LocalDate firstDayOfMonth = now.withDayOfMonth(1);
        LocalDate lastDayOfMonth = now.withDayOfMonth(now.lengthOfMonth());

        // 요금 계산 기간의 시작일과 종료일을 결정
        LocalDate billingStart = startDate.isBefore(firstDayOfMonth) ? firstDayOfMonth : startDate;
        LocalDate billingEnd = endDate.isAfter(lastDayOfMonth) ? lastDayOfMonth : endDate;

        // 실제 사용 일수를 계산
        long daysUsed = ChronoUnit.DAYS.between(billingStart, billingEnd.plusDays(1));

        double dailyRate = getDailyRate(subscription.getPlan());
        return dailyRate * daysUsed;
    }

    private double getDailyRate(Plan plan) {
        switch (plan) {
            case BASIC:
                return BASIC_DAILY_RATE;
            case INTERMEDIATE:
                return INTERMEDIATE_DAILY_RATE;
            case PREMIUM:
                return PREMIUM_DAILY_RATE;
            default:
                return 0.0;
        }
    }
    private void processPayment(Subscription subscription, double amount) {

        String paymentId = UUID.randomUUID().toString(); // 새로운 paymentId 생성
        String url = "https://api.portone.io/payments/" + paymentId + "/billing-key";
        SchoolInformation schoolInformation = schoolInformationRepository.findById(subscription.getSchoolInformation().getSchoolId())
                .orElseThrow(() -> new RuntimeException("해당하는 학교가 없습니다"));
        String schoolName = schoolInformation.getSchulNm();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "PortOne " + portOneApiSecret);
        headers.set("Content-Type", "application/json");

        Map<String, Object> paymentDetails = new HashMap<>();
        paymentDetails.put("billingKey", subscription.getBillingKey());
        paymentDetails.put("orderName", "월간 이용권 정기결제");

        Map<String, Object> customer = new HashMap<>();
        customer.put("id", schoolInformation.getSchoolId());
        customer.put("name", schoolName);

        paymentDetails.put("customer", customer);

        Map<String, Object> amountDetails = new HashMap<>();
        amountDetails.put("total", amount);

        paymentDetails.put("amount", amountDetails);
        paymentDetails.put("currency", "KRW");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(paymentDetails, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        boolean success = response.getStatusCode().is2xxSuccessful();

        // paymentId를 PaymentRecord의 기본 키로 설정하여 저장
        PaymentRecord paymentRecord = PaymentRecord.builder()
                .paymentId(paymentId) // 여기에서 paymentId를 설정
                .amount(amount)
                .paymentDate(LocalDateTime.now())
                .subscription(subscription)
                .success(success)
                .build();

        paymentRecordRepository.save(paymentRecord);

        if (!success) {
            throw new RuntimeException("Failed to create billing key payment: " + response.getStatusCode());
        }
    }
    private void handlePaymentFailure(Subscription subscription, Exception e) {

        // 결제 실패 로그를 데이터베이스에 저장
        PaymentFail paymentFail = PaymentFail.builder()
                .failDate(LocalDate.now())
                .failReason(e.getMessage())
                .subscription(subscription)
                .build();

        paymentFailRepository.save(paymentFail);

        // 관리자 또는 사용자에게 알림 전송 (이메일, SMS 등)

    }
}
