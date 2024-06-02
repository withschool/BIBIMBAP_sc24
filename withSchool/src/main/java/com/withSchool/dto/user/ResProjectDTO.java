package com.withSchool.dto.user;

import com.withSchool.entity.user.ProjectTask;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class ResProjectDTO {
    private Long projectId;
    private String title;
    private List<ResProjectTaskDTO> dto;
}
