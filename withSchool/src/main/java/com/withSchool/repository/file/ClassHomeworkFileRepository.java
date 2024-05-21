package com.withSchool.repository.file;

import com.withSchool.entity.classes.ClassHomeworkFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ClassHomeworkFileRepository extends JpaRepository<ClassHomeworkFile,Long> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM ClassHomeworkFile c WHERE c.classHomework.classHomeworkId = :classHomeworkId")
    void deleteAllByClassHomeworkId(Long classHomeworkId);

    @Query("SELECT c FROM ClassHomeworkFile c WHERE c.classHomework.classHomeworkId = :classHomeworkId")
    Optional<List<ClassHomeworkFile>> findByClassHomeworkId(Long classHomeworkId);
}
