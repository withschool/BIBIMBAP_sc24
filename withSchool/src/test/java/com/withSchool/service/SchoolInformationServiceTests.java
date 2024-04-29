package com.withSchool.service;

import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.service.school.SchoolInformationService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.IntStream;

@SpringBootTest
public class SchoolInformationServiceTests {
    @Autowired
    private SchoolInformationService schoolInformationService;

    @Test
    public void delete(){
        schoolInformationService.delete(19L);
    }
    @Test
    public void add(){
        IntStream.rangeClosed(1,10).forEach(i->{
            SchoolInformation schoolInformation = SchoolInformation.builder()
                    .orgRdnda("창현초등학교(수원)" + i)
                    .atptOfcdcScCode("123"+i)
                    .sdSchulCode("123"+i)
                    .build();
            schoolInformationService.save(schoolInformation);
        });
    }

    @Test
    public void list(){
         System.out.println(schoolInformationService.findAll());
    }
}
