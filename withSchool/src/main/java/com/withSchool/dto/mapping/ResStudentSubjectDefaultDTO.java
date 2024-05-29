package com.withSchool.dto.mapping;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@Data
@ToString
public class ResStudentSubjectDefaultDTO {
    Long studentSubjectId;
    Long userId;
    String userName;
    Long subjectId;
    int finalScore;
    int midtermScore;
    int activityScore;
    int totalScore;
}
