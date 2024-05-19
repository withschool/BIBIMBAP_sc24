package com.withSchool.dto.user;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Builder
@Data
@Getter
@ToString
public class PreSignUpRequestDTO {
    private Long schoolId;
    private String userName;
    private String birthDate;
    private String userCode;
}
