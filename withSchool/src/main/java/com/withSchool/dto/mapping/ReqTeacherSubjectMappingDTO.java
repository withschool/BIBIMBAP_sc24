package com.withSchool.dto.mapping;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@Data
@ToString
public class ReqTeacherSubjectMappingDTO {
    Long subjectId;
    Long teacherId;
}
