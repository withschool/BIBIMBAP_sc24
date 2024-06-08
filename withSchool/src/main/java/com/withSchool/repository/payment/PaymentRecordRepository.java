package com.withSchool.repository.payment;

import com.withSchool.entity.payment.PaymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentRecordRepository extends JpaRepository<PaymentRecord,Long> {
    @Query("SELECT p FROM PaymentRecord p WHERE p.subscription.schoolInformation.schoolId = :schoolId ORDER BY p.paymentDate DESC")
    List<PaymentRecord> findAllBySchoolId(@Param("schoolId") Long schoolId);

}
