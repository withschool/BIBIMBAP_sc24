package com.withSchool.dto.user;

import lombok.*;

@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ResUserDefaultDTO {
    private Long userId;
    private String userName;
    private String name;
    private String phoneNumber;
    private String email;
    private boolean sex;
}
