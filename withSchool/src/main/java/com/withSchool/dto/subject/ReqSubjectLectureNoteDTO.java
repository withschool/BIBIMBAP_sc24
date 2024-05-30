package com.withSchool.dto.subject;

import com.withSchool.entity.subject.Subject;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Data
@Getter
@ToString
public class ReqSubjectLectureNoteDTO {
    private String title;
    private Long subjectId;
    private List<MultipartFile> file;
}
