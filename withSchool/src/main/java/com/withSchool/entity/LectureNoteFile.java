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
public class LectureNoteFile extends BaseFileEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long LectureNoteFileId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_note_id")
    private LectureNote lectureNote;
}
