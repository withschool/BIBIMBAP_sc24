package com.withSchool.dto.school;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SchoolInformationListDTO { // 학교 리스트 조회
    private Long SchoolId;
    private String SchoolName;
    private String SchoolAddress;
    private String schoolPhoneNumber;
    private String educationOffice;
    private LocalDateTime regDate;
}
