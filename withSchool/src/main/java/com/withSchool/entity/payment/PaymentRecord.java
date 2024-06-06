package com.withSchool.entity.payment;

import com.withSchool.entity.base.BaseEntity;
import com.withSchool.entity.school.SchoolInformation;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PaymentRecord{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private LocalDateTime paymentDate;

    private double amount;

    @ManyToOne
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;

}
