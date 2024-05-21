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
public class ResHomeworkDTO {
    private Long id; // 과제의 id
    private String title;
    private String content;
    private LocalDateTime due;
    private List<String> filesURl;
    private List<String> originalName;
}
