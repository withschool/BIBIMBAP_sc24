package com.withSchool.dto.subject;

import lombok.*;

@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReqQuestionPostModifyDTO {
    Long questionPostId;
    String questionContent;
}
