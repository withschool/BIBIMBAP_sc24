package com.withSchool.dto;

import com.withSchool.entity.Subject;
import com.withSchool.entity.User;
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
    private User student;
    private Subject subject;
    private LocalDateTime regDate;
}
