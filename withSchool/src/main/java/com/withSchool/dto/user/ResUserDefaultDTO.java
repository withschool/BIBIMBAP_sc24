package com.withSchool.dto.user;

import lombok.*;

@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ResUserDefaultDTO {
    Long userId;
    String userName;
    String name;
}
