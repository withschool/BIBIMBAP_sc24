package com.withSchool.repository.file;

import com.withSchool.entity.subject.SubjectHomeworkSubmitFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SubjectHomeworkSubmitFileRepository extends JpaRepository<SubjectHomeworkSubmitFile,Long> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM SubjectHomeworkSubmitFile s WHERE s.subjectHomeworkSubmit.subjectHomeworkSubmitId = :subjectHomeworkSubmitId")
    void deleteAllBySubjectHomeworkSubmitId(Long subjectHomeworkSubmitId);

    @Query("SELECT s FROM SubjectHomeworkSubmitFile s WHERE s.subjectHomeworkSubmit.subjectHomeworkSubmitId = :subjectHomeworkSubmitId")
    Optional<List<SubjectHomeworkSubmitFile>> findBySubjectHomeworkSubmitId(Long subjectHomeworkSubmitId);

}
