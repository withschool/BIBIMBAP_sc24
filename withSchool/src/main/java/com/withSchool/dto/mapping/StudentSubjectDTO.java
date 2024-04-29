package com.withSchool.dto.mapping;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Data
@Getter
@ToString
public class StudentSubjectDTO {
    private Long studentSubjectId;
    private int midtermScore;
    private int finalScore;
    private int activityScore;
    private int totalScore;
    private String student;
    private String subject;
    private LocalDateTime regDate;
}
