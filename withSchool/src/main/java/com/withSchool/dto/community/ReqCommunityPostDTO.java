package com.withSchool.dto.community;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReqCommunityPostDTO {
    private Long communityId;
    private String title;
    private String content;
}
