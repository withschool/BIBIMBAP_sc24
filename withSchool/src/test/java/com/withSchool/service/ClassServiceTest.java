package com.withSchool.service;

import com.withSchool.dto.classes.ClassDTO;
import com.withSchool.service.classes.ClassService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ClassServiceTest {

    @Autowired
    private ClassService classService;
    @Test
    public void classInput() throws Exception {
        ClassDTO classDTO = ClassDTO.builder()
                .year(2024)
                .grade(3)
                .inClass(2)
                .schoolId(9L)
                .build();
        classService.saveClassInformation(classDTO);
    }

}
