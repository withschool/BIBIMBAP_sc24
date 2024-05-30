package com.withSchool.repository.subject;

import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.subject.SubjectLectureNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SubjectLectureNoteRepository extends JpaRepository<SubjectLectureNote,Long> {

    Optional<List<SubjectLectureNote>> findBySubject(@Param("subject") Subject subject);
}
