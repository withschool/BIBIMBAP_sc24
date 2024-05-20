package com.withSchool.repository.mapping;

import com.withSchool.entity.mapping.TeacherSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeacherSubjectRepository extends JpaRepository<TeacherSubject,Long> {
    @Query("SELECT t FROM TeacherSubject t WHERE t.user.userId = :teacherId")
    List<TeacherSubject> findByTeacherId(Long teacherId);
}
