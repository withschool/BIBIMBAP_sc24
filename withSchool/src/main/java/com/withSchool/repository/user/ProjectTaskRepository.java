package com.withSchool.repository.user;

import com.withSchool.entity.user.ProjectTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectTaskRepository extends JpaRepository<ProjectTask,Long> {
    @Query("SELECT pt FROM ProjectTask pt WHERE pt.project.projectId = :projectId")
    List<ProjectTask> findByProjectId(@Param("projectId") Long projectId);

}
