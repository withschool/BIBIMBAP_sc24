package com.withSchool.repository;

import com.withSchool.entity.SchoolInformation;
import com.withSchool.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    @Query("SELECT s FROM Subject s WHERE s.subjectName LIKE %:subjectName%")
    List<Subject> findBySubjectName(String subjectName);

    @Query("SELECT s FROM Subject s WHERE s.schoolInformation = :schoolInformation")
    List<Subject> findBySchool(SchoolInformation schoolInformation);
}
