package com.withSchool.repository;

import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.repository.classes.ClassRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@SpringBootTest
@Transactional
public class ClassRepositoryTest {
    @Autowired
    private ClassRepository classRepository;

    @Test
    @DisplayName("반 PK로 반 정보 가져오기")
    public void testLoadClasses(){
        // given
        Long classId = 1L;

        // when
        Optional<ClassInformation> classInformation = classRepository.findById(classId);

        // then
        Assertions.assertTrue(classInformation.isPresent());
        int grade = 1;
        int inClass = 2;
        int year = 2024;

        Assertions.assertEquals(grade, classInformation.get().getGrade());
        Assertions.assertEquals(inClass, classInformation.get().getInClass());
        Assertions.assertEquals(year, classInformation.get().getYear());

    }
}
