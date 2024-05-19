package com.withSchool.entity.subject;

import com.withSchool.entity.base.BaseFileEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class SubjectHomeworkFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("과제 공지 파일 PK")
    private Long subjectHomeworkFileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "homework_id")
    @Comment("과제 PK")
    private SubjectHomework subjectHomework;
}
