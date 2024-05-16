package com.withSchool.service;

import com.withSchool.dto.subject.SubjectInfoDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.classes.ClassRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.subject.SubjectService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@SpringBootTest
@Transactional
public class SubjectServiceTest {

    @Autowired
    private SubjectService subjectService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchoolInformationRepository schoolInformationRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    SchoolInformation schoolInformation;
    Subject subject;
    ClassInformation classInformation;
    User student;
    User teacher;


    @BeforeEach
    public void init() {
        schoolInformation = schoolInformationRepository.save(SchoolInformation.builder().schulNm("아주고등학교").build());
        subject = subjectRepository.save(Subject.builder().subjectName("수학").grade("3").semester("1").year("2024").schoolInformation(schoolInformation).build());
        classInformation = classRepository.save(ClassInformation.builder().grade(1).year(2024).inClass(8).schoolInformation(schoolInformation).build());
        student = userRepository.save(User.builder().id("student").password(passwordEncoder.encode("dd1")).name("student").accountType(0).schoolInformation(schoolInformation).classInformation(classInformation).build());
        teacher = userRepository.save(User.builder().id("teacher").password(passwordEncoder.encode("dd1")).name("teacher").accountType(1).schoolInformation(schoolInformation).classInformation(classInformation).build());
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(new UsernamePasswordAuthenticationToken(student, student.getPassword()));
    }

    @Test
    public void registerSubject() {
        subjectService.saveSubject("정보");
    }

    @Test
    @DisplayName("어드민이 속한 학교의 정보를 가져와서 학교에 속해있는 모든 과목 목록")
    public void testLoadSubjectsBySchool() {
        // given
        Optional<User> response = userRepository.findById(18L);
        Assertions.assertTrue(response.isPresent());
        User user = response.get();

        // when
        List<SubjectInfoDTO> subjectInfoDTOS = subjectService.findAllSubjectByUserSchool(user);

        // then
        Assertions.assertEquals(2, subjectInfoDTOS.size());


        // given
        response = userRepository.findById(30L);
        Assertions.assertTrue(response.isPresent());
        user = response.get();

        // when
        subjectInfoDTOS = subjectService.findAllSubjectByUserSchool(user);

        // then
        Assertions.assertEquals(8, subjectInfoDTOS.size());

    }

    @Test
    @DisplayName("학생 교사에 대해서 자신이 속해있는 수업을 list 하기 위한 메서드")
    public void testListAllSubjectsByUser() {
        // given
        Optional<User> response = userRepository.findById(22L);
        Assertions.assertTrue(response.isPresent());
        User user = response.get();

        // when
        List<SubjectInfoDTO> subjectInfoDTOS = subjectService.findAllSugangByUser(user);

        // then
        Assertions.assertEquals(1, subjectInfoDTOS.size());

    }

    @Test
    @DisplayName("수업 PK로 찾기")
    public void testFindSubjectByPk(){
        // given
        Long subjectId = 3L;
        Long falseId = 11L;

        // when
        SubjectInfoDTO subject = subjectService.findById(subjectId);
        SubjectInfoDTO falseSubject = subjectService.findById(falseId);

        // then
        Assertions.assertEquals("국어", subject.getSubjectName());
        Assertions.assertNull(falseSubject);
    }
    @Test
    @DisplayName("수업 PK로 수업 지우기")
    public void testDeleteSubjectByPk(){
        // given
        Long subjectId = subject.getSubjectId();
        SubjectInfoDTO subject = subjectService.findById(subjectId);
        Assertions.assertEquals("수학", subject.getSubjectName());

        // when
        subjectService.deleteById(subjectId);

        // then
        Assertions.assertNull(subjectService.findById(subjectId));
    }
}
