package com.withSchool.dto.subject;

import lombok.*;

@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReqQuestionPostQuestionerPostDTO {
    String questionContent;
    Long subjectId;
}
