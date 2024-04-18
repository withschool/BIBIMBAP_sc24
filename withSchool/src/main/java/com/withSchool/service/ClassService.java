package com.withSchool.service;
import com.withSchool.DTO.ClassDTO;
import com.withSchool.entity.ClassInformation;
import com.withSchool.entity.SchoolInformation;
import com.withSchool.repository.ClassRepository;
import com.withSchool.repository.SchoolInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private SchoolInformationRepository schoolInformationRepository;

    // 반 정보 저장
    @PreAuthorize("hasRole('ADMIN')")
    public ClassInformation saveClassInformation(ClassDTO classDTO){

        ClassInformation newClass = classBuilder(classDTO);

        return classRepository.save(newClass);
    }

    // 반 정보 조회
    @PreAuthorize("hasRole('ADMIN')")
    public List<ClassInformation> findBySchoolInformation_SchoolId(Long schoolId) {
        return classRepository.findBySchoolInformation_SchoolId(schoolId);
    }
    @PreAuthorize("hasRole('ADMIN')")
    public List<ClassInformation> findBySchoolInformation_SchoolIdAndGrade(Long schoolId, int grade) {
        return classRepository.findBySchoolInformation_SchoolIdAndGrade(schoolId, grade);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Optional<ClassInformation> findBySchoolInformation_SchoolIdAndGradeAndInClass(Long schoolId, int grade, int inClass) {
        return classRepository.findBySchoolInformation_SchoolIdAndGradeAndInClass(schoolId, grade, inClass);
    }

    // 특정 반 정보 조회
    @PreAuthorize("hasRole('ADMIN')")
    public Optional<ClassInformation> getClassById(Long classId) {
        return classRepository.findById(classId);
    }

    // 반 정보 수정
    @PreAuthorize("hasRole('ADMIN')")
    public ClassInformation updateClassInformation(Long classId, ClassDTO updatedClassDTO) {
        ClassInformation existingClass = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found with id: " + classId));
        ClassInformation updatedClass = classBuilder(updatedClassDTO);

        return classRepository.save(updatedClass);
    }

    // 반 정보 삭제
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteClassInformation(Long classId) {
        classRepository.deleteById(classId);
    }

    public ClassInformation classBuilder(ClassDTO classDTO)
    {
        SchoolInformation schoolInformation = schoolInformationRepository.findById(classDTO.getSchoolId())
                .orElseThrow(() -> new RuntimeException("School not found with id: " + classDTO.getSchoolId()));

        return ClassInformation.builder()
                .classId(classDTO.getClassId())
                .year(classDTO.getYear())
                .grade(classDTO.getGrade())
                .inClass(classDTO.getInClass())
                .schoolInformation(schoolInformation)
                .build();
    }
}

