package com.withSchool.dto.file;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileDeleteDTO {
    private String savedName;
    private Long masterId;
    private String repoType;
}
