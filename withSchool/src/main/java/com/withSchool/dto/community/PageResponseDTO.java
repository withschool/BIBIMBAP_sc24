package com.withSchool.dto.community;

import com.withSchool.entity.community.Community;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PageResponseDTO {
    private Long communityId;
    private String category;
    private String communityName;
}

