package com.withSchool.repository.file;

import com.withSchool.entity.classes.ClassNoticeFile;
import com.withSchool.entity.school.SchoolNoticeFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ClassNoticeFileRepository extends JpaRepository<ClassNoticeFile,Long> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM ClassNoticeFile c WHERE c.classNotice.classNoticeId = :classNoticeId")
    void deleteAllByClassNoticeId(Long classNoticeId);

    @Query("SELECT c FROM ClassNoticeFile c WHERE c.classNotice.classNoticeId = :classNoticeId")
    Optional<List<ClassNoticeFile>> findByClassNoticeId(Long classNoticeId);
}
