package com.withSchool.repository.mapping;

import com.withSchool.entity.mapping.StudentSubject;
import com.withSchool.entity.mapping.TeacherSubject;
import com.withSchool.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeacherSubjectRepository extends JpaRepository<TeacherSubject,Long> {
    @Query("SELECT t FROM TeacherSubject t WHERE t.teacher.userId = :teacherId")
    List<TeacherSubject> findByTeacherId(Long teacherId);

    @Query("SELECT ts FROM TeacherSubject ts WHERE ts.teacher = :teacher")
    List<TeacherSubject> findByTeacher(@Param("teacher") User teacher);
}
