package com.withSchool.repository.payment;

import com.withSchool.entity.payment.Subscription;
import com.withSchool.entity.school.SchoolInformation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {
    Optional<Subscription> findBySchoolInformationAndEndDateIsNull(SchoolInformation schoolInformation);
}
