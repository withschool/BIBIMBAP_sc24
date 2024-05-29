package com.withSchool.dto.subject;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SubjectInfoDTO {
    private Long subjectId;
    private String subjectName;
    private String year;
    private String grade;
    private String semester;
    private LocalDateTime regDate;
}
