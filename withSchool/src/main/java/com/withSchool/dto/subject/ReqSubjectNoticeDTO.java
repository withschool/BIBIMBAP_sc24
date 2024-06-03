package com.withSchool.dto.subject;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Data
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReqSubjectNoticeDTO{
    private Long subjectId;
    private String title;
    private String content;
    private List<MultipartFile> file;
}
