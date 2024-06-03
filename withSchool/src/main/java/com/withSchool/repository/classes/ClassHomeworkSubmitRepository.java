package com.withSchool.repository.classes;

import com.withSchool.entity.classes.ClassHomeworkSubmit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClassHomeworkSubmitRepository extends JpaRepository<ClassHomeworkSubmit,Long> {
    @Query("SELECT c FROM ClassHomeworkSubmit c WHERE c.student.userId=:userId AND c.classHomework.classHomeworkId=:homeworkId")
    Optional<ClassHomeworkSubmit> findByUserIdHomeworkId(Long userId, Long homeworkId);

    @Query("SELECT c FROM ClassHomeworkSubmit c WHERE c.classHomework.classHomeworkId = :homeworkId")
    Optional<List<ClassHomeworkSubmit>> findAllByHomeworkId(Long homeworkId);
}
