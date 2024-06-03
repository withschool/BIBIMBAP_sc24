package com.withSchool.repository.file;

import com.withSchool.entity.classes.ClassHomeworkSubmitFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ClassHomeworkSubmitFileRepository extends JpaRepository<ClassHomeworkSubmitFile,Long> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM ClassHomeworkSubmitFile c WHERE c.classHomeworkSubmit.classHomeworkSubmitId = :classHomeworkSubmitId")
    void deleteAllByClassHomeworkSubmitFileId(Long classHomeworkSubmitId);
    @Query("SELECT c FROM ClassHomeworkSubmitFile c WHERE c.classHomeworkSubmit.classHomeworkSubmitId = :homeworkSubmitId")
    Optional<List<ClassHomeworkSubmitFile>> findByClassHomeworkSubmitId(Long homeworkSubmitId);

}
