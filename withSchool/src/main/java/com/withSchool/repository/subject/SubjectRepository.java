package com.withSchool.repository.subject;

import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    @Query("SELECT s FROM Subject s JOIN s.schoolInformation i WHERE s.subjectName = :subjectName AND i.schoolId = :schoolId")
    Optional<Subject> findBySubjectName(@Param("subjectName") String subjectName, @Param("schoolId") Long schoolId);

    @Query("SELECT s FROM Subject s WHERE s.schoolInformation = :schoolInformation")
    List<Subject> findBySchool(@Param("schoolInformation") SchoolInformation schoolInformation);

}
