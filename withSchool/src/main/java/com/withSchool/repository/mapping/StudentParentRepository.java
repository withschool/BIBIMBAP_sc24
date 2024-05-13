package com.withSchool.repository.mapping;

import com.withSchool.entity.mapping.StudentParent;
import com.withSchool.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentParentRepository extends JpaRepository<StudentParent, Long> {
    
    // 테스트 작성해야 함
    //  주의사항: 컨트롤러, 서비스, 메소드 전부 다시 손 봐야함
    @Query("SELECT sp.student.userId FROM StudentParent sp WHERE sp.parent.userId = :parentId")
    Long findStudentByParentId(Long parentId);

    List<User> findStudentsByParent(User parent);

}
