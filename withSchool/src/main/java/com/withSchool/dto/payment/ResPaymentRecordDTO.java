package com.withSchool.dto.payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResPaymentRecordDTO {
    private String paymentId;
    private int plan;
    private int amount;
    private LocalDateTime paymentDate;
    private boolean success;
}
