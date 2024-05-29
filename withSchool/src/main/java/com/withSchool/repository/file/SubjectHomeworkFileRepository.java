package com.withSchool.repository.file;

import com.withSchool.entity.subject.SubjectHomeworkFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SubjectHomeworkFileRepository extends JpaRepository<SubjectHomeworkFile,Long> {
    @Query("SELECT s FROM SubjectHomeworkFile s WHERE s.subjectHomework.subjectHomeworkId = :homeworkId")
    Optional<List<SubjectHomeworkFile>> findBySubjectHomeworkId(Long homeworkId);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM SubjectHomeworkFile s WHERE s.subjectHomework.subjectHomeworkId = :subjectHomeworkId")
    void deleteAllBySubjectHomeworkId(Long subjectHomeworkId);
}
