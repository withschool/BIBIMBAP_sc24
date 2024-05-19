package com.withSchool.service.classes;

import com.withSchool.dto.classes.ClassDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.service.user.UserService;
import com.withSchool.repository.classes.ClassRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClassService {

    private final UserService userService;

    private final ClassRepository classRepository;

    private final SchoolInformationRepository schoolInformationRepository;

    // 반 정보 저장
    @PreAuthorize("hasRole('ADMIN')")
    public ClassInformation saveClassInformation(ClassDTO classDTO) throws Exception {

        if(!classRepository.checkDuplicate(classDTO.getGrade(), classDTO.getInClass(), classDTO.getYear())){
            ClassInformation newClass = classBuilder(classDTO);
            return classRepository.save(newClass);
        }
        throw new Exception("이미 존재하는 반입니다");
    }
    // 반 정보 조회
    public List<ClassDTO> findBySchoolInformation(Integer grade, Integer inClass) {
        Long schoolId = userService.getCurrentUserSchoolId();
        List<ClassDTO> dtos = new ArrayList<>();
        List<ClassInformation> classInformations;
        if (grade != null && inClass != null) {
            classInformations = classRepository.findBySchoolInformation_SchoolIdAndGradeAndInClass(schoolId, grade, inClass);
        } else if (grade != null) {
            classInformations = classRepository.findBySchoolInformation_SchoolIdAndGrade(schoolId, grade);
        } else {
            classInformations = classRepository.findBySchoolInformation_SchoolId(schoolId);
        }

        for (ClassInformation c : classInformations) {
            ClassDTO dto = c.toClassDTO();
            dtos.add(dto);
        }

        return dtos;
    }

    // 특정 반 정보 조회
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @Transactional
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

    public ClassInformation classBuilder(ClassDTO classDTO) {
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

