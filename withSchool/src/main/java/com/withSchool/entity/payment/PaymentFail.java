package com.withSchool.entity.payment;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PaymentFail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentFailId;

    private LocalDate failDate;
    private String failReason;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;
}
