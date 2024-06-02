package com.withSchool.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqUpdateProjectTaskDTO {
    private Long projectId;
    private Long taskId;
    private String title;
    private String description;
    private List<MultipartFile> files;
    private LocalDateTime date;
    private String tags;
}
