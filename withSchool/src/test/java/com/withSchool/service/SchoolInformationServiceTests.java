package com.withSchool.service;

import com.withSchool.service.school.SchoolInformationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SchoolInformationServiceTests {
    @Autowired
    private SchoolInformationService schoolInformationService;

    @Test
    public void delete(){
        schoolInformationService.delete(19L);
    }
}
