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
public class SubjectLectureNoteFile extends BaseFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("강의노트 파일 PK")
    private Long subjectLectureNoteFileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_note_id")
    @Comment("강의노트 PK")
    private SubjectLectureNote subjectLectureNote;
}
