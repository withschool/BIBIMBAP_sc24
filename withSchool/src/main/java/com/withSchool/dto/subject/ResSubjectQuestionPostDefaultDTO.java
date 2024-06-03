package com.withSchool.dto.subject;

import com.withSchool.dto.user.ResUserDefaultDTO;
import lombok.*;

@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ResSubjectQuestionPostDefaultDTO {
    private Long subjectQuestionPostId;
    private String questionContent;
    private String answerContent;
    private int isAnswered;
    private Long subjectId;
    private ResUserDefaultDTO questioner;
    private ResUserDefaultDTO answerer;
}
