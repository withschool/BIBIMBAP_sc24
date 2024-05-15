package com.withSchool.dto.mapping;

import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
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
