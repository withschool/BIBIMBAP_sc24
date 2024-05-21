package com.withSchool.repository.subject;

import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    @Query("SELECT s FROM Subject s WHERE s.subjectName LIKE %:subjectName%")
    List<Subject> findBySubjectName(@Param("subjectName") String subjectName);

    @Query("SELECT s FROM Subject s WHERE s.schoolInformation = :schoolInformation")
    List<Subject> findBySchool(@Param("schoolInformation") SchoolInformation schoolInformation);
}
