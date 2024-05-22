package com.withSchool.repository.classes;

import com.withSchool.entity.classes.ClassHomework;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClassHomeworkRepository extends JpaRepository<ClassHomework,Long> {
    @Query("SELECT c FROM ClassHomework c WHERE c.classInformation.classId = :classId")
    List<ClassHomework> findAlLByClassId(Long classId);
}
