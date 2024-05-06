package com.withSchool.service;

import com.withSchool.dto.subject.SubjectInfoDTO;
import com.withSchool.entity.user.User;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.school.SchoolInformationService;
import com.withSchool.service.subject.SubjectService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@SpringBootTest
@Transactional
public class SubjectServiceTest {

    @Autowired
    private SubjectService subjectService;
    @Autowired
    private SchoolInformationService schoolInformationService;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void registerSubject() {
        User user = userRepository.findById(30L).get();
        subjectService.saveSubject("정보", user);
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
        Long subjectId = 3L;
        SubjectInfoDTO subject = subjectService.findById(subjectId);
        Assertions.assertEquals("국어", subject.getSubjectName());

        // when
        subjectService.deleteById(subjectId);

        // then
        Assertions.assertNull(subjectService.findById(subjectId));
    }
}
