package com.withSchool.entity.payment;

import com.withSchool.entity.school.SchoolInformation;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subscriptionId;

    @Enumerated(EnumType.STRING)
    private Plan plan;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String billingKey;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolInformation schoolInformation;

    public void changeEndDate(LocalDateTime endDate){
        this.endDate = endDate;
    }
}
