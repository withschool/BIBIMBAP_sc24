package com.withSchool.dto.user;

import lombok.*;


@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ResUserMappingParentDTO {
    private Long userId;
    private String userName;
    private String name;
    private String birthdate;
    private String schoolName;
}
