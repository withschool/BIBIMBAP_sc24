package com.withSchool.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqCalendarDTO {
    private String title;
    private LocalDateTime start;
    private LocalDateTime end;
    private String type;
    private String description;
}
