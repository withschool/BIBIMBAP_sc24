package com.withSchool.dto.community;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;


@Builder
@Data
@Getter
@ToString
public class ReqCounselDefaultDTO {
    Long answererId;
    String category;
    String schedule;
}
