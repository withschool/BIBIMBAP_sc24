package com.withSchool.repository.subject;

import com.withSchool.entity.subject.SubjectHomework;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface SubjectHomeworkRepository extends JpaRepository<SubjectHomework,Long> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM SubjectHomeworkFile s WHERE s.subjectHomework.subjectHomeworkId = : subjectHomeworkId")
    void deleteAllBySubjectHomeworkId(Long subjectHomeworkId);
}
