package com.withSchool.dto.mapping;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Builder
@Getter
@Data
@ToString
public class ReqStudentSubjectScoreDTO {
    private String type;
    private List<UserScoreDTO> userScoreList;
}
