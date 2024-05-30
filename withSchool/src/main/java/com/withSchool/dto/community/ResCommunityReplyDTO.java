package com.withSchool.dto.community;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResCommunityReplyDTO {
    private Long replyId;
    private Long userId;
    private String content;
    private int like;
    private LocalDateTime reqDate;
    private LocalDateTime modDate;
}
