package com.withSchool.repository.user;

import com.withSchool.entity.user.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Long> {

    @Query("SELECT p FROM Project p Where p.user.userId=:userId")
    List<Project> findByUserId(@Param("userId") Long userId);
}
