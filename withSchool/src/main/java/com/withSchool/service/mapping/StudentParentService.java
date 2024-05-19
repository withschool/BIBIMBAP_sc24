package com.withSchool.service.mapping;

import com.withSchool.dto.mapping.ResStudentParentDefaultDTO;
import com.withSchool.entity.mapping.StudentParent;
import com.withSchool.entity.user.User;
import com.withSchool.repository.mapping.StudentParentRepository;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentParentService {
    private final StudentParentRepository studentParentRepository;
    private final UserService userService;

    public void mapping(User student, User parent) {
        StudentParent studentParent = StudentParent.builder()
                .parent(parent)
                .student(student)
                .build();

        studentParentRepository.save(studentParent);
    }

    public List<ResStudentParentDefaultDTO> findChildrenByParent(){
        User parent = userService.getCurrentUser();
        List<StudentParent> mapping = studentParentRepository.findStudentsByParent(parent);
        List<ResStudentParentDefaultDTO> dtos = new ArrayList<>();

        for (StudentParent sp : mapping) {
            dtos.add(sp.toResStudentParentDefaultDTO());
        }

        return dtos;
    }
}
