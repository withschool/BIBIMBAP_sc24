package com.withSchool.dto.school;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Data
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReqNoticeDTO {
    private String title;
    private String content;
    private List<MultipartFile> file;
}