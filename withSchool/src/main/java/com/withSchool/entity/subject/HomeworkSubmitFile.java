package com.withSchool.entity.subject;

import com.withSchool.entity.base.BaseFileEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomeworkSubmitFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("과제 제출 첨부파일 PK")
    private Long homeworkSubmitFileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "homework_submit_id")
    @Comment("과제 제출 PK")
    private HomeworkSubmit homeworkSubmit;
}
