package com.withSchool.entity.subject;

import com.withSchool.entity.base.BaseEntity;
import com.withSchool.entity.base.BasePostEntity;
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
public class SubjectLectureNote extends BasePostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("강의노트 PK")
    private Long subjectLectureNoteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    @Comment("과목 PK")
    private Subject subject;
}
