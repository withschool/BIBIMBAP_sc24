package com.withSchool.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class ReqUserRegisterDTO {
    private String type;
    private String name;
    private String birthDate;
    private int grade;
    private int classNumber;
    private int semester;
    private int year;
    private String[] subjects;
}
