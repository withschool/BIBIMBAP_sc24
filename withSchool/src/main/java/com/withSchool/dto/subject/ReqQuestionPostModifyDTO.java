package com.withSchool.dto.subject;

import lombok.*;

@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReqQuestionPostModifyDTO {
    private String questionContent;
    private String answerContent;
}
