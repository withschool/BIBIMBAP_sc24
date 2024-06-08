package com.withSchool.dto.community;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResCommunityPostListDTO {
    private List<ResCommunityPostDTO> postList;
    private long totalPosts;
}
