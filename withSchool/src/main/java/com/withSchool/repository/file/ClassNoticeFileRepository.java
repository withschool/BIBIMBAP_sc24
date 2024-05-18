package com.withSchool.repository.file;

import com.withSchool.entity.classes.ClassNoticeFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ClassNoticeFileRepository extends JpaRepository<ClassNoticeFile,Long> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM ClassNoticeFile c WHERE c.classNotice.classNoticeId = :classNoticeId")
    void deleteAllByClassNoticeId(Long classNoticeId);
}
