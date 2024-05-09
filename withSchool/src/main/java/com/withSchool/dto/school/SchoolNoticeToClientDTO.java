package com.withSchool.dto.school;

import com.withSchool.dto.user.StudentListDTO;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Data
@ToString
public class SchoolNoticeToClientDTO {
    String title;
    String content;
    StudentListDTO user;
    LocalDateTime regDate;
    List<String> filesURl;
    List<String> originalName;
}
