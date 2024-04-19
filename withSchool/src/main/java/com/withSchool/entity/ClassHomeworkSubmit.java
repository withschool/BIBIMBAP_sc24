package com.withSchool.entity;

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
@Table(name = "class_homework_submit")
public class ClassHomeworkSubmit extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_homework_submit_id", unique = true, nullable = false)
    @Comment("반 과제 제출 PK")
    private Long classHomeworkSubmitId;

    @Column(name = "submit_content", columnDefinition = "TEXT")
    @Comment("반 과제 제출 본문")
    private String submitContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_homework_id", nullable = false)
    @Comment("반 과제 PK")
    private ClassHomework classHomework;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @Comment("과제 제출 학생 PK")
    private User student;
}
