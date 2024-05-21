package com.withSchool.repository;

import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.subject.SubjectRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@Transactional
public class SubjectRepositoryTest {
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private SchoolInformationRepository schoolInformationRepository;

    @Test
    public void test(){
        Optional<Subject> subject = subjectRepository.findBySubjectNameAndGradeAndYear("수학","9","1",10L);
        if(subject.isPresent()){
            System.out.println(subject.get().getSubjectName());
        }
    }

    @Test
    @DisplayName("학교에 등록된 모든 수업 불러오기 테스트")
    public void subjectBySchool(){
        // given
        SchoolInformation schoolInformation = schoolInformationRepository.findById(10L).get();

        List<Long> testSubjectsId = new ArrayList<>();
        testSubjectsId.add(1L);
        testSubjectsId.add(2L);

        // when
        List<Subject> subjects = subjectRepository.findBySchool(schoolInformation);
        List<Long> subjectsId = new ArrayList<>();

        for (Subject s : subjects) {
            subjectsId.add(s.getSubjectId());
        }

        // then
        Assertions.assertEquals(testSubjectsId, subjectsId);
    }
}
