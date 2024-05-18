package com.withSchool.service.mapping;

import com.withSchool.dto.user.ResUserDefaultDTO;
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

    public List<ResUserDefaultDTO> findChildrenByParent(){
        User parent = userService.getCurrentUser();
        List<StudentParent> mapping = studentParentRepository.findStudentsByParent(parent);
        List<User> children = mapping.stream()
                .map(StudentParent::getStudent)
                .toList();

        List<ResUserDefaultDTO> dtos = new ArrayList<>();

        for (User u : children) {
            dtos.add(userService.userEntityToResUserDefaultDTO(u));
        }

        return dtos;
    }

}
