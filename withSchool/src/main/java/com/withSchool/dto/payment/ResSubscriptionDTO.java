package com.withSchool.dto.payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResSubscriptionDTO {
    private Long subscriptionId;
    private int plan;
    private LocalDate startDate;
}
