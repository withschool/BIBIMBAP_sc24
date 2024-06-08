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
public class ReqSubscriptionDTO {
    private int plan;
    private String billingKey;
    private LocalDate endDate;
}
