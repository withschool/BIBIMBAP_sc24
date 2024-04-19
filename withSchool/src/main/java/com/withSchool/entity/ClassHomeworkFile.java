package com.withSchool.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "class_homework_file")
public class ClassHomeworkFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_homework_file_id", nullable = false, unique = true)
    @Comment("반 과제 첨부파일 PK")
    private Long classHomeworkFileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_homework_id", nullable = false)
    @Comment("반 과제 PK")
    private ClassHomework classHomework;
}
