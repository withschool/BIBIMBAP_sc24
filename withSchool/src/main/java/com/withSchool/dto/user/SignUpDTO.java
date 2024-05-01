package com.withSchool.dto.user;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpDTO {
    private String id;
    private String email;
    private String password;
    private String name;
    private Boolean sex;
    private String phoneNumber;
    private String address;
    private String birthDate;
    private int accountType;
    private String userCode;
    private String parentCode;
}