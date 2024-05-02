package com.withSchool.service.classes;

import com.withSchool.dto.classes.ClassDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.user.User;
import com.withSchool.repository.classes.ClassRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClassService {

    private final ClassRepository classRepository;

    private final UserRepository userRepository;

    private final SchoolInformationRepository schoolInformationRepository;

    // 반 정보 저장
    @PreAuthorize("hasRole('ADMIN')")
    public ClassInformation saveClassInformation(ClassDTO classDTO) {

        ClassInformation newClass = classBuilder(classDTO);

        return classRepository.save(newClass);
    }
    // 반 정보 조회
    public List<ClassInformation> findBySchoolInformation(Integer grade, Integer inClass) {
        Long schoolId = getCurrentUserSchoolId();
        if (grade != null && inClass != null) {
            return classRepository.findBySchoolInformation_SchoolIdAndGradeAndInClass(schoolId, grade, inClass);
        } else if (grade != null) {
            return classRepository.findBySchoolInformation_SchoolIdAndGrade(schoolId, grade);
        } else {
            return classRepository.findBySchoolInformation_SchoolId(schoolId);
        }
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

    public Long getCurrentUserSchoolId() {
        // 현재 로그인된 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // 사용자의 학교 정보에서 schoolId를 반환
        SchoolInformation schoolInformation = user.getSchoolInformation();
        if (schoolInformation == null) {
            throw new IllegalStateException("User is not associated with any school");
        }
        return schoolInformation.getSchoolId();
    }
}

