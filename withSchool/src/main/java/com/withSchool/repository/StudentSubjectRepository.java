package com.withSchool.repository;

import com.withSchool.entity.StudentSubject;
import com.withSchool.entity.Subject;
import com.withSchool.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentSubjectRepository extends JpaRepository<StudentSubject, Long> {

    @Query("SELECT ss FROM StudentSubject ss WHERE ss.user = :student")
    List<StudentSubject> findByStudent(@Param("student") User student);

    @Query("SELECT ss.user FROM StudentSubject ss WHERE ss.subject = :subject")
    List<User> findUsersBySubject(@Param("subject") Subject subject);
}
