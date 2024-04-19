package com.withSchool.repository.mapping;

import com.withSchool.entity.mapping.StudentParent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentParentRepository extends JpaRepository<StudentParent, Long> {
    @Query("SELECT sp.student.userId FROM StudentParent sp WHERE sp.parent.userId = :parentId")
    Long findStudentByParentId(Long parentId);

}
