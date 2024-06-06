package com.withSchool.service.billing;

import com.withSchool.entity.payment.PaymentRecord;
import com.withSchool.entity.payment.Plan;
import com.withSchool.entity.payment.Subscription;
import com.withSchool.repository.payment.PaymentRecordRepository;
import com.withSchool.repository.payment.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BillingService {
    private final SubscriptionRepository subscriptionRepository;
    private final PaymentRecordRepository paymentRecordRepository;

    private static final double BASIC_DAILY_RATE = 100000;
    private static final double INTERMEDIATE_DAILY_RATE = 150000;
    private static final double PREMIUM_DAILY_RATE = 200000;

    @Scheduled(cron = "0 0 0 1 * ?") // 매월 1일 0시 0분 0초에 실행
    @Transactional
    public void processMonthlyBilling() {
        List<Subscription> subscriptions = subscriptionRepository.findAll();

        for (Subscription subscription : subscriptions) {
            double amount = calculateAmount(subscription);
            processPayment(subscription, amount);
        }
    }

    private double calculateAmount(Subscription subscription) {
        double dailyRate = getDailyRate(subscription.getPlan());
        long daysInMonth = getDaysInMonth(new Date());

        return dailyRate * daysInMonth;
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
    private long getDaysInMonth(LocalDateTime date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
    }
    private void processPayment(Subscription subscription, double amount) {
        // 결제 처리 로직 (토스페이먼트 API 호출 등)
        // 예시: TossPaymentsAPI.process(subscription.getBillingKey(), amount);

        PaymentRecord payment = new PaymentRecord();
        payment.setSubscription(subscription);
        payment.setPaymentDate(new Date());
        payment.setAmount(amount);
        paymentRepository.save(payment);
    }

}
