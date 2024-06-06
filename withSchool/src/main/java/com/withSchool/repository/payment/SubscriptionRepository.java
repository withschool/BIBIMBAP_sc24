package com.withSchool.repository.payment;

import com.withSchool.entity.payment.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {
}
