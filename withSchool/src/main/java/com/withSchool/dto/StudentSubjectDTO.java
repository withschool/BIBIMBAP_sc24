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
    private Long ssid;
    private int midtermScore;
    private int finalScore;
    private User student;
    private Subject subject;
    private LocalDateTime regDate;
}
