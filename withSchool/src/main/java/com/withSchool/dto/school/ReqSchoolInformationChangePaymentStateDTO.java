package com.withSchool.dto.school;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@Data
@ToString
public class ReqSchoolInformationChangePaymentStateDTO {
    private Long schoolId;
    private int paymentState;
}
