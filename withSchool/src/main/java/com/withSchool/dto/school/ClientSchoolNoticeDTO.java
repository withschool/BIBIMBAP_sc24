package com.withSchool.dto.school;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

@Builder
@Data
@Getter
@ToString
public class ClientSchoolNoticeDTO{
    String title;
    String content;
    List<MultipartFile> file;
}
