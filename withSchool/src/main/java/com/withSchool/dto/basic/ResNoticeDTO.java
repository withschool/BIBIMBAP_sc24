package com.withSchool.dto.basic;

import com.withSchool.dto.user.StudentListDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Data
@ToString
public class ResNoticeDTO {
    String title;
    String content;
    String user;
    LocalDateTime regDate;
    List<String> filesURl;
    List<String> originalName;
}
