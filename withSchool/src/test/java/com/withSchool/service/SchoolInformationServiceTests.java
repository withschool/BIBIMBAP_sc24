package com.withSchool.service;

import org.hibernate.annotations.Comment;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

@SpringBootTest
public class SchoolInformationServiceTests {
    @Autowired
    private SchoolInformationService schoolInformationService;

    @Test
    public void delete(){
        schoolInformationService.delete(19L);
    }
}
