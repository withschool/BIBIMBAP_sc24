package com.withSchool.dto.mapping;

import com.withSchool.dto.user.ResUserMappingParentDTO;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ResStudentParentDefaultDTO {
    private Long studentParentId;
    private ResUserMappingParentDTO user;
    private LocalDateTime regDate;
}
