package com.withSchool.dto.school;

import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.user.User;
import lombok.*;

@Builder
@Data
@Getter
@ToString
public class SchoolNoticeDTO {
    String title;
    String content;
    User user;
    SchoolInformation school;
}
