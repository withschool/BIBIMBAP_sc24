package com.withSchool.repository.mapping;

import com.withSchool.entity.mapping.StudentSubject;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentSubjectRepository extends JpaRepository<StudentSubject, Long> {

    @Query("SELECT ss FROM StudentSubject ss WHERE ss.user = :student AND ss.user.id IS NOT NULL")
    List<StudentSubject> findByStudent(@Param("student") User student);

    @Query("SELECT ss.user FROM StudentSubject ss WHERE ss.subject = :subject AND ss.user.id IS NOT NULL")
    List<User> findUsersBySubject(@Param("subject") Subject subject);

    @Query("SELECT ss.subject FROM StudentSubject ss WHERE ss.user = :user")
    List<Subject> findSubjectsByUser(@Param("user") User user);

    @Modifying
    @Query("DELETE FROM StudentSubject ss WHERE ss.user.userId = :userId")
    void deleteSsByUserId(@Param("userId") Long userId);

    List<StudentSubject> findBySubject_SubjectIdAndUser_IdIsNotNull(Long subjectId);

    Optional<StudentSubject> findByUser_UserIdAndSubject_SubjectId(Long userId, Long subjectId);
}
