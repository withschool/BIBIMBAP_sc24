package com.withSchool.dto.subject;

import lombok.*;

@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReqSubjectDefaultDTO {
    private String subjectName;
    private String subjectYear;
    private String subjectSemester;
    private String subjectGrade;
}
