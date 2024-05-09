package com.withSchool.dto.file;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileDeleteDTO {
    private String fileUrl;
    private Long masterId;
}
