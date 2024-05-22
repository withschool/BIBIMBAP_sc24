package com.withSchool.dto.classes;

import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.user.User;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Data
@Getter
@ToString
public class ClassNoticeDTO {
    String title;
    String content;
    User user;
    List<MultipartFile> file;
    ClassInformation classInformation;
}
