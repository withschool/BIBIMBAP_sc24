package com.withSchool.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomeworkSubmitFile extends BaseFileEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long homeworkNoticeFileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "homework_submit_id")
    private HomeworkSubmit homeworkSubmit;
}
