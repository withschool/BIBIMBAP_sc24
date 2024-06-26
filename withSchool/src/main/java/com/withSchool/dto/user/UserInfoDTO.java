package com.withSchool.dto.user;

import lombok.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class UserInfoDTO { // 사용자 기본 정보들
    private Long userId;
    private String id;
    private String password;
    private String email;
    private String name;
    private Boolean sex;
    private String phoneNumber;
    private String address;
    private String birthDate;
    private int accountType;
}
