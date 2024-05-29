package com.withSchool.dto.school;

import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.user.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Data
@Getter
@ToString
public class SchoolNoticeDTO {
    private String title;
    private String content;
    private User user;
    private List<MultipartFile> file;
    private SchoolInformation school;
}
