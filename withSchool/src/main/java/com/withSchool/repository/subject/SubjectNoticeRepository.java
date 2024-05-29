package com.withSchool.repository.subject;

import com.withSchool.entity.classes.ClassNotice;
import com.withSchool.entity.subject.SubjectNotice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubjectNoticeRepository extends JpaRepository<SubjectNotice,Long> {
    @Query("SELECT s FROM SubjectNotice s WHERE s.subject.subjectId = :subjectId")
    List<SubjectNotice> findAllBySubjectId(Long subjectId);
}
