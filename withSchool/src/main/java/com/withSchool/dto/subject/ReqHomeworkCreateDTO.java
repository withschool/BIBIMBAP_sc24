package com.withSchool.dto.subject;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReqHomeworkCreateDTO {
    private Long id; // class or subject
    private String title;
    private String content;
    private LocalDateTime due;
    private List<MultipartFile> files;
}
