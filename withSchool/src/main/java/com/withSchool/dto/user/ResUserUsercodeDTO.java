package com.withSchool.dto.user;

import lombok.*;

@Builder
@Data
@Getter
@ToString
public class ResUserUsercodeDTO {
    private Long userId;
    private String userName;
    private String name;
    private String userCode;
}
