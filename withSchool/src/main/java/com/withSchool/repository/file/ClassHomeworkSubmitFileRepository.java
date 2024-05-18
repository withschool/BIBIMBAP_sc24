package com.withSchool.repository.file;

import com.withSchool.entity.classes.ClassHomeworkSubmitFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ClassHomeworkSubmitFileRepository extends JpaRepository<ClassHomeworkSubmitFile,Long> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM ClassHomeworkSubmitFile c WHERE c.classHomeworkSubmit.classHomeworkSubmitId = :classHomeworkSubmitId")
    void deleteAllByClassHomeworkSubmitFileId(Long classHomeworkSubmitId);
}
