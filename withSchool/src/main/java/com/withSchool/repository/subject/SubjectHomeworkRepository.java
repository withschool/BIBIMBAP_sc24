package com.withSchool.repository.subject;

import com.withSchool.entity.subject.SubjectHomework;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SubjectHomeworkRepository extends JpaRepository<SubjectHomework,Long> {

    @Query("SELECT s FROM SubjectHomework s WHERE s.subject.subjectId = :subjectId")
    List<SubjectHomework> findAlLBySubjectId(Long subjectId);
}
