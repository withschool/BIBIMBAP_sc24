package com.withSchool.dto.subject;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReqHomeworkSubmitDTO {
    private Long homeworkId;
    private String content;
    private List<MultipartFile> files;
}
