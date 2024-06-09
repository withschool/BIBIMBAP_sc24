package com.withSchool.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResUserInfoDTO {
    private String id;
    private String name;
    private String phoneNumber;
    private int accountType;
    private Integer grade;
    private Integer inClass;
    private String userCode;

}
