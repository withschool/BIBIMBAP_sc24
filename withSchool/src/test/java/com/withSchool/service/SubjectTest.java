package com.withSchool.service;

import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.school.SchoolInformationService;
import com.withSchool.service.subject.SubjectService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SubjectTest {

    @Autowired
    private SubjectService subjectService;
    @Autowired
    private SchoolInformationService schoolInformationService;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void registerSubject(){
        User user = userRepository.findById(30L).get();
        subjectService.saveSubject("정보",user);
    }

}
