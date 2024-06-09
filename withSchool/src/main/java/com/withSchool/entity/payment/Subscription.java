package com.withSchool.entity.payment;

import com.withSchool.entity.school.SchoolInformation;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subscriptionId;

    private int plan;

    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate lastBillingDate;
    private String billingKey;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolInformation schoolInformation;

}
