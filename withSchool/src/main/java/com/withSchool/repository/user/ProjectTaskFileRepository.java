package com.withSchool.repository.user;

import com.withSchool.entity.user.ProjectTaskFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProjectTaskFileRepository extends JpaRepository<ProjectTaskFile,Long> {
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("DELETE FROM ProjectTaskFile p WHERE p.projectTask.taskId = :taskId")
    void deleteAllByProjectTaskId(Long taskId);

    @Query("SELECT p FROM ProjectTaskFile p WHERE p.projectTask.taskId=:taskId")
    List<ProjectTaskFile> findByTaskId(@Param("taskId")Long taskId);

}
