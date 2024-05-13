package com.withSchool.service.mapping;

import com.withSchool.entity.mapping.StudentParent;
import com.withSchool.entity.user.User;
import com.withSchool.repository.mapping.StudentParentRepository;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

}
