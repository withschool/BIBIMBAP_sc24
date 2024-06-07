package com.withSchool.dto.school;

import com.withSchool.entity.payment.Plan;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReqUpgradePlanDTO {
    private Plan newPlan;
    private LocalDate endDate;
}
