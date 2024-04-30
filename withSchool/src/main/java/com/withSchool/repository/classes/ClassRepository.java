package com.withSchool.repository.classes;

import com.withSchool.entity.classes.ClassInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassRepository extends JpaRepository<ClassInformation, Long> {

    // 특정 학교의 모든 반 조회
    List<ClassInformation> findBySchoolInformation_SchoolId(Long schoolInformation_schoolId);

    // 특정 학교의 특정 학년의 모든 반 조회
    List<ClassInformation> findBySchoolInformation_SchoolIdAndGrade(Long schoolId, int grade);

    // 특정 학교의 특정 학년의 특정 반 조회
    List<ClassInformation> findBySchoolInformation_SchoolIdAndGradeAndInClass(Long schoolId, int grade, int inClass);

}
