package com.withSchool.service;

import com.withSchool.dto.user.ResUserDefaultDTO;
import com.withSchool.dto.user.UserDeleteRequestDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.classes.ClassRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
@Transactional
public class UserServiceTest {

    SchoolInformation schoolInformation;
    Subject subject;
    ClassInformation classInformation;
    User student;
    User teacher;

    @Autowired
    private SchoolInformationRepository schoolInformationRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void init() {
        schoolInformation = schoolInformationRepository.save(SchoolInformation.builder().schulNm("아주고등학교").build());
        subject = subjectRepository.save(Subject.builder().subjectName("수학").grade("3").semester("1").year("2024").schoolInformation(schoolInformation).build());
        classInformation = classRepository.save(ClassInformation.builder().grade(1).year(2024).inClass(8).schoolInformation(schoolInformation).build());
        student = userRepository.save(User.builder().id("student").name("student").accountType(0).schoolInformation(schoolInformation).classInformation(classInformation).build());
        teacher = userRepository.save(User.builder().id("teacher").name("teacher").accountType(1).schoolInformation(schoolInformation).classInformation(classInformation).build());
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(new UsernamePasswordAuthenticationToken(student, student.getPassword()));
    }

    @Autowired
    private UserService userService;

    @Test
    public void delete() {
        List<Long> userId = Arrays.asList(78L, 79L, 80L, 81L, 82L, 83L, 84L);
        UserDeleteRequestDTO dto = UserDeleteRequestDTO.builder()
                .userId(userId)
                .build();
        userService.delete(dto);
    }

    @Test
    @DisplayName("유저 PK로 유저 찾기")
    public void testFindUserByPk() {
        // given
        Long userId = 30L;

        // when
        User user = userService.findByUserId(userId);

        // then
        Assertions.assertNotNull(user);
        Assertions.assertEquals("dd1", user.getId());

    }

    @Test
    @DisplayName("유저의 id로 유저 찾기")
    public void testFindUserById() {
        // given
        String userId = "dd1";
        String falseId = "dfdf";

        // when
        User user = userService.findById(userId);
        User nullUser = userService.findById(falseId);

        // then
        Assertions.assertNotNull(user);
        Assertions.assertEquals(30, user.getUserId());

        Assertions.assertNull(nullUser);
    }

    @Test
    @DisplayName("회원가입 전 학교 PK, 유저 이름, 생년월일, 유저코드를 사용해서 유저 정보 가져오기")
    public void testLoadUserUsingUserCode() {
        // given
        Long schoolId = 9L;
        String userName = "John Doe";
        String birthDate = "111111";
        String userCode = "USR1223";

        String falseUserCode = "UUU";

        // when
        User user = userService.findBySchoolInformationSchoolIdAndNameAndBirthDateAndUserCode(schoolId, userName, birthDate, userCode);
        User fail = userService.findBySchoolInformationSchoolIdAndNameAndBirthDateAndUserCode(schoolId, userName, birthDate, falseUserCode);

        // then
        Assertions.assertNotNull(user);
        Assertions.assertEquals("dd1", user.getId());

        Assertions.assertNull(fail);

    }

    @Test
    @DisplayName("해당 학교의 모든 유저 정보 불러오기")
    public void testFindAllUserBySchool(){
        // given

        // when
        List<ResUserDefaultDTO> users = userService.findAllBySchool_SchoolId();

        // then
        Assertions.assertEquals(2, users.size());

    }
}
