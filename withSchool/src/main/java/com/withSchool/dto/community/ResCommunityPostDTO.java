package com.withSchool.dto.community;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResCommunityPostDTO {

    private Long postId;
    private String title;
    private String content;
    private int likeCount;
    private int replyCount;
    private LocalDateTime regDate;
    private LocalDateTime modDate;
}
