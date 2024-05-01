package com.withSchool.repository;

import com.withSchool.entity.subject.Subject;
import com.withSchool.repository.subject.SubjectRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
public class SubjectRepositoryTest {
    @Autowired
    private SubjectRepository subjectRepository;

    @Test
    public void test(){
        Optional<Subject> subject = subjectRepository.findBySubjectName("수학",9L);
        if(subject.isPresent()){
            System.out.println(subject.get().getSubjectName());
        }
    }
}
