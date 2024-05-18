package com.withSchool.repository.file;

import com.withSchool.entity.subject.SubjectNoticeFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface SubjectNoticeFileRepository extends JpaRepository<SubjectNoticeFile,Long> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM SubjectNoticeFile s WHERE s.subjectNotice.subjectNoticeId = : subjectNoticeId")
    void deleteAllBySubjectNoticeId(Long subjectNoticeId);
}
