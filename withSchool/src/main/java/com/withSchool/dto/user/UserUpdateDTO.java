package com.withSchool.dto.user;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class UserUpdateDTO { // 클라이언트에서 수정가능한 필드들
    private Long userId;
    private String email;
    private String phoneNumber;
    private String address;
}
