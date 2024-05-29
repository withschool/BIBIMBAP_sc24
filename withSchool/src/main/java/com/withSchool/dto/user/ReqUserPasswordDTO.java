package com.withSchool.dto.user;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class ReqUserPasswordDTO {
    private Long userId;
    private String password;
}
