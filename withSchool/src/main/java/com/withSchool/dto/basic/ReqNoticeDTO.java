package com.withSchool.dto.basic;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Data
@Getter
@ToString
public class ReqNoticeDTO {
    String title;
    String content;
    List<MultipartFile> file;
}
