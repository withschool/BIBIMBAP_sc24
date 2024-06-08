package com.withSchool.entity.payment;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PaymentRecord{
    @Id
    private String paymentId;
    private LocalDateTime paymentDate;
    private int amount;
    private boolean success;
    private int plan;

    @ManyToOne
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;

}
