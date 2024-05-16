package com.withSchool.dto.school;

import com.withSchool.dto.user.ResUserDefaultDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Data
@ToString
public class ResSchoolNoticeDTO {
    String title;
    String content;
    ResUserDefaultDTO user;
    LocalDateTime regDate;
    List<String> filesURl;
    List<String> originalName;
}
