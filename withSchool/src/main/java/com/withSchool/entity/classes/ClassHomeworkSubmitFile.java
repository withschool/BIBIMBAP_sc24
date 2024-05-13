package com.withSchool.entity.classes;

import com.withSchool.entity.base.BaseFileEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "class_homework_submit_file")
public class ClassHomeworkSubmitFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_homework_submit_file_id", nullable = false, unique = true)
    @Comment("반 과제 제출 첨부파일 PK")
    private Long classHomeworkSubmitFileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_homework_submit_id", nullable = false)
    @Comment("반 과제 제출 PK")
    private ClassHomeworkSubmit classHomeworkSubmit;
}
