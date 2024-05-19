package com.withSchool.service;

import com.withSchool.dto.user.ResUserDefaultDTO;
import com.withSchool.dto.subject.SubjectInfoDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.mapping.StudentSubjectService;
import com.withSchool.service.subject.SubjectService;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest
public class StudentSubjectServiceTest {

    @Autowired
    private StudentSubjectService studentSubjectService;

    @Autowired
    private UserService userService;

    @Autowired
    private SubjectService subjectService;


    @Test
    public void findOnesSugang() {
        User user = userService.findById("id0");

        System.out.println(studentSubjectService.findOnesSugang(user));
    }

    @Test
    public void sugangInformation(){
        Map<String, Object> response = new HashMap<>();
        Long subjectId = 1L;
        SubjectInfoDTO subjectInfoDTO = subjectService.findById(subjectId);
        List<User> users = studentSubjectService.findSugangStudent(subjectId);
        List<ResUserDefaultDTO> studentListDTOS = new ArrayList<>();

        for (User u : users) {
            ResUserDefaultDTO resUserDefaultDTO = ResUserDefaultDTO.builder()
                    .userId(u.getUserId())
                    .name(u.getName())
                    .userName(u.getId())
                    .build();

            studentListDTOS.add(resUserDefaultDTO);
        }
        response.put("subject", subjectInfoDTO);
        response.put("students", studentListDTOS);

        System.out.println(response);
    }

}
