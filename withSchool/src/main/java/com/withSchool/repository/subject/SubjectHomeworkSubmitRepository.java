package com.withSchool.repository.subject;

import com.withSchool.entity.subject.SubjectHomeworkSubmit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SubjectHomeworkSubmitRepository extends JpaRepository<SubjectHomeworkSubmit,Long> {
    @Query("SELECT s FROM SubjectHomeworkSubmit s WHERE s.user.userId=:userId AND s.subjectHomework.subjectHomeworkId=:homeworkId")
    Optional<SubjectHomeworkSubmit> findByUserIdHomeworkId(Long userId, Long homeworkId);
    @Query("SELECT s FROM SubjectHomeworkSubmit s WHERE s.subjectHomework.subjectHomeworkId = :homeworkId")
    Optional<List<SubjectHomeworkSubmit>> findAllByHomeworkId(Long homeworkId);

}
