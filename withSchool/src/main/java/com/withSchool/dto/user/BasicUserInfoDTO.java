package com.withSchool.dto.user;

import lombok.*;

@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BasicUserInfoDTO{
    private Long userId;
    private String id;
    private String name;
    private String phoneNumber;
    private String email;
    private String address;
    private boolean sex;
    private Long schoolId;
    private Long classId;
}
