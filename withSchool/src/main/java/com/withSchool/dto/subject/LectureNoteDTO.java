package com.withSchool.dto.subject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LectureNoteDTO {
    private Long lectureNoteId;
    private String title;
    private Long subjectId;
    private String subjectName;
    private String regDate;
}