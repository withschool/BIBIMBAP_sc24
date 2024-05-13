package com.withSchool.repository.subject;

import com.withSchool.entity.subject.LectureNote;
import com.withSchool.entity.subject.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LectureNoteRepository extends JpaRepository<LectureNote, Long> {

    Optional<List<LectureNote>> findBySubject(@Param("subject") Subject subject);
}
