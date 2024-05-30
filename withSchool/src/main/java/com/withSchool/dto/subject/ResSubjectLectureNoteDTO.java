package com.withSchool.dto.subject;

import com.withSchool.dto.user.ResUserDefaultDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Data
@ToString
public class ResSubjectLectureNoteDTO {
    private Long subjectLectureNoteId;
    private String title;
    private ResUserDefaultDTO user;
    private LocalDateTime regDate;
    private List<String> filesURl;
    private List<String> originalName;
}