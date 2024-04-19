package com.withSchool.dto;

import lombok.*;

@Data
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor


public class ClassDTO {

    private Long classId;

    private int year;

    private int grade;

    private int inClass;

    private Long schoolId;
}