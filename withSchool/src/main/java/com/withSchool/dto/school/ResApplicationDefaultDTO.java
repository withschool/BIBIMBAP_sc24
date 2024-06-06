package com.withSchool.dto.school;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@Data
@ToString
public class ResApplicationDefaultDTO {
    private Long schoolApplicationId;
    private String schoolName;
    private String schoolPhoneNumber;
    private String schoolAdminName;
    private String schoolAdminEmail;
    private int state;
    private int serviceType;
}
