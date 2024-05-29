package com.withSchool.repository.file;

import com.withSchool.entity.subject.SubjectLectureNoteFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface SubjectLectureNoteFileRepository extends JpaRepository<SubjectLectureNoteFile,Long> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM SubjectLectureNoteFile s WHERE s.subjectLectureNote.subjectLectureNoteId = : subjectLectureNoteId")
    void deleteAllBySubjectLectureNoteId(Long subjectLectureNoteId);
}
