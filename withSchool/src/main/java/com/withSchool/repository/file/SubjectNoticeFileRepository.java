package com.withSchool.repository.file;

import com.withSchool.entity.classes.ClassNoticeFile;
import com.withSchool.entity.subject.SubjectNoticeFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SubjectNoticeFileRepository extends JpaRepository<SubjectNoticeFile,Long> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM SubjectNoticeFile s WHERE s.subjectNotice.subjectNoticeId = :subjectNoticeId")
    void deleteAllBySubjectNoticeId(Long subjectNoticeId);

    @Query("SELECT s FROM SubjectNoticeFile s WHERE s.subjectNotice.subjectNoticeId = :subjectNoticeId")
    Optional<List<SubjectNoticeFile>> findBySubjectNoticeId(Long subjectNoticeId);
}
