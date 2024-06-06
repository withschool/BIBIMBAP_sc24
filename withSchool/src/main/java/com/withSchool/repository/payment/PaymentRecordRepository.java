package com.withSchool.repository.payment;

import com.withSchool.entity.payment.PaymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRecordRepository extends JpaRepository<PaymentRecord,Long> {
}
