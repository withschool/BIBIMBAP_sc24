package com.withSchool.dto;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class SignUpDTO {
    private String id;
    private String email;
    private String password;
    private String name;
    private Boolean sex;
    private String phoneNumber;
    private String address;
    private LocalDateTime birthDate;
    private int accountType;
    private String userCode;
    private String parentCode;
}