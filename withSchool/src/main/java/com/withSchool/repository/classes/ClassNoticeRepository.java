package com.withSchool.repository.classes;

import com.withSchool.entity.classes.ClassNotice;
import com.withSchool.entity.school.SchoolNotice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClassNoticeRepository extends JpaRepository<ClassNotice,Long> {
    @Query("SELECT c FROM ClassNotice c WHERE c.classInformation.classId = :classId")
    List<ClassNotice> findAllByClassId(Long classId);
}
