package com.withSchool.repository.file;

import com.withSchool.entity.school.SchoolNoticeFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SchoolNoticeFileRepository extends JpaRepository<SchoolNoticeFile,Long> {

    @Query("SELECT f FROM SchoolNoticeFile f WHERE f.schoolNotice.schoolNoticeId = :schoolNoticeId")
    Optional<List<SchoolNoticeFile>> findBySchoolNoticeId(Long schoolNoticeId);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM SchoolNoticeFile f WHERE f.schoolNotice.schoolNoticeId = :schoolNoticeId")
    void deleteAllBySchoolNoticeId(Long schoolNoticeId);

}
