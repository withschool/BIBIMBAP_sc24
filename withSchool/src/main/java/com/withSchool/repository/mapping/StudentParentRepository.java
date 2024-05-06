package com.withSchool.repository.mapping;

import com.withSchool.entity.mapping.StudentParent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentParentRepository extends JpaRepository<StudentParent, Long> {
    
    // TODO 테스트 작성해야 함
    //  주의사항: 컨트롤러, 서비스, 메소드 전부 다시 손 봐야함
    @Query("SELECT sp.student.userId FROM StudentParent sp WHERE sp.parent.userId = :parentId")
    Long findStudentByParentId(Long parentId);

}
