package com.withSchool.repository.payment;

import com.withSchool.entity.payment.PaymentFail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentFailRepository extends JpaRepository<PaymentFail,Long> {
}
