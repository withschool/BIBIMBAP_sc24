package com.withSchool.dto.file;

import com.withSchool.entity.school.SchoolNotice;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileDTO {
    private MultipartFile file;
    private Long masterId;
}
