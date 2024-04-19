package com.withSchool.dto.user;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Builder
@Data
@Getter
@ToString
public class StudentListDTO {
    private Long userId;
    private String id;
    private String name;
}
