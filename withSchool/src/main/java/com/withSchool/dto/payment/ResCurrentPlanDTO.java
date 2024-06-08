package com.withSchool.dto.payment;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ResCurrentPlanDTO {
    private int plan;
    private int userCount;
    private LocalDate nextBillingDate;
}
