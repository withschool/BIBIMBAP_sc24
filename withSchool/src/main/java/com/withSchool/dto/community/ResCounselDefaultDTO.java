package com.withSchool.dto.community;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Builder
@Data
@Getter
@ToString
public class ResCounselDefaultDTO {
    Long counselId;
    Long askerId;
    Long answererId;
    String category;
    int counselState;
    LocalDateTime schedule;
    LocalDateTime regDate;
}
