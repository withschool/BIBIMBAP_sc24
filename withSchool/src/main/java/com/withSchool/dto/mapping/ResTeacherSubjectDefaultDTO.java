package com.withSchool.dto.mapping;

import com.withSchool.dto.subject.SubjectInfoDTO;
import com.withSchool.dto.user.ResUserDefaultDTO;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Builder
@Getter
@Data
@ToString
public class ResTeacherSubjectDefaultDTO {
    Long teacherSubjectId;
    ResUserDefaultDTO teacher;
    SubjectInfoDTO subject;
    LocalDateTime regDate;
}
