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
    private String title;
    private String content;
    private ResUserDefaultDTO user;
    private LocalDateTime regDate;
    private List<String> filesURl;
    private List<String> originalName;
}
