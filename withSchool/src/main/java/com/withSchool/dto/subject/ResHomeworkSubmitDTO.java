package com.withSchool.dto.subject;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
@Builder
@Data
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ResHomeworkSubmitDTO {
    private Long id; // 과제의 id
    private String content;
    private List<String> filesURl;
    private List<String> originalName;
}
