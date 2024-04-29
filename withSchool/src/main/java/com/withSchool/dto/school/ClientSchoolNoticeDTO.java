package com.withSchool.dto.school;

import lombok.*;

@Builder
@Data
@Getter
@ToString
public class ClientSchoolNoticeDTO {
    String title;
    String content;
}
