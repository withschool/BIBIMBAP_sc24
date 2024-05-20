package com.withSchool.repository.file;

import com.withSchool.entity.subject.SubjectLectureNoteFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


public interface SubjectLectureNoteFileRepository extends JpaRepository<SubjectLectureNoteFile,Long> {
    Optional<List<SubjectLectureNoteFile>> findBySubjectLectureNote_SubjectLectureNoteId(Long subjectLectureNoteId);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM SubjectLectureNoteFile f WHERE f.subjectLectureNote.subjectLectureNoteId = :subjectLectureNoteId")
    void deleteAllBySubjectLectureNoteId(Long subjectLectureNoteId);
}
