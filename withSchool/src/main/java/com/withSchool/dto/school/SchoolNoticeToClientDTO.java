package com.withSchool.dto.school;

import com.withSchool.dto.user.StudentListDTO;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Data
@ToString
public class SchoolNoticeToClientDTO {
    String title;
    String content;
    StudentListDTO user;
    LocalDateTime regDate;
}
