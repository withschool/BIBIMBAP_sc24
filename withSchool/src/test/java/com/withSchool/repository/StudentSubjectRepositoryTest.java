package com.withSchool.repository;

import com.withSchool.entity.mapping.StudentSubject;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.mapping.StudentSubjectRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.repository.user.UserRepository;
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
public class StudentSubjectRepositoryTest {
    @Autowired
    private StudentSubjectRepository studentSubjectRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SubjectRepository subjectRepository;

    @Test
    @DisplayName("학생이 수강하는 수업 전체 목록")
    public void testSubjectByUser() {
        // given
        Long userId = 22L;
        Optional<User> user = userRepository.findById(userId);
        Assertions.assertTrue(user.isPresent());

        // when
        List<StudentSubject> subjects = studentSubjectRepository.findByStudent(user.get());

        // then
        Assertions.assertEquals(1, subjects.size());
    }

    @Test
    @DisplayName("특정 과목에 대한 수강생, 교사 목록")
    public void testUserListBySubject(){
        // given
        Long subjectId = 1L;
        Optional<Subject> subject = subjectRepository.findById(subjectId);
        Assertions.assertTrue(subject.isPresent());

        // when
        List<User> users = studentSubjectRepository.findUsersBySubject(subject.get());

        // then
        Assertions.assertEquals(2, users.size());
        
    }
}
