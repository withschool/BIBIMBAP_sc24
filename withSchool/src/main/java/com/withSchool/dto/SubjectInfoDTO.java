package com.withSchool.dto;

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
    private LocalDateTime regDate;
}
