package com.withSchool.dto.classes;

import lombok.*;

@Data
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor


public class ClassDTO {

    private int year;

    private int grade;

    private int inClass;

    private Long schoolId;
}