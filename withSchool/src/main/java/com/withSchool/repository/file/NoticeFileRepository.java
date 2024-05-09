package com.withSchool.repository.file;

import com.withSchool.entity.school.SchoolNoticeFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NoticeFileRepository extends JpaRepository<SchoolNoticeFile,Long> {

    @Query("SELECT f FROM SchoolNoticeFile f WHERE f.schoolNotice.schoolNoticeId = :schoolNoticeId")
    Optional<List<SchoolNoticeFile>> findBySchoolNoticeId(Long schoolNoticeId);

}
