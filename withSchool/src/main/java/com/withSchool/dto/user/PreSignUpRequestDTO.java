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
    Long schoolId;
    String userName;
    String birthDate;
    String userCode;
}
