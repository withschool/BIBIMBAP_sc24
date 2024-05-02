package com.withSchool.dto.school;

import lombok.*;

@Builder
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SchoolInformationListDTO { // 학교 리스트 조회
    private Long SchoolId;
    private String SchoolName;
    private String SchoolAddress;
}
