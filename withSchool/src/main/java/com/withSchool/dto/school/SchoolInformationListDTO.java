package com.withSchool.dto.school;

import lombok.*;

@Builder
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SchoolInformationListDTO { // 학교 리스트 조회
    private Long SchoolId;
    private String ORG_RDNDA; // 학교 도로명 주소
}
