package com.withSchool.dto.school;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Data
@Getter
@ToString
public class ReqSchoolNoticeDTO {
    private String title;
    private String content;
    private List<MultipartFile> file;
}
