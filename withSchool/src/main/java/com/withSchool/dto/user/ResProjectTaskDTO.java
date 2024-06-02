package com.withSchool.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class ResProjectTaskDTO {
    private Long projectId;
    private Long taskId;
    private String title;
    private String description;
    private List<String> url;
    private LocalDateTime date;
    private String tags;
}
