package com.withSchool.repository.school;

import com.withSchool.entity.school.SchoolNotice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SchoolNoticeRepository extends JpaRepository<SchoolNotice, Long> {
    @Query("SELECT s FROM SchoolNotice s WHERE s.schoolNoticeId = :schoolNoticeId")
    Optional<SchoolNotice> findById(Long schoolNoticeId);

    @Query("SELECT s FROM SchoolNotice s WHERE s.schoolInformation.schoolId = :schoolId")
    List<SchoolNotice> findAllBySchoolId(Long schoolId);
}
