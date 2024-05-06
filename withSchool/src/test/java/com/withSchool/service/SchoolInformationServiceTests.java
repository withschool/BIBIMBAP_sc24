package com.withSchool.service;

import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.service.school.SchoolInformationService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
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

    @Test
    @DisplayName("PK로 학교 정보 찾기")
    public void testFindByPk(){
        // given
        Long schoolId = 10L;

        // when
        Optional<SchoolInformation> response = schoolInformationService.findById(schoolId);

        // then
        Assertions.assertTrue(response.isPresent());
        SchoolInformation schoolInformation = response.get();
        Assertions.assertEquals("강동고등학교", schoolInformation.getSchulNm());

    }

    @Test
    @DisplayName("시도교육청코드와 행정표준코드로 중복되는 학교인지 찾기")
    public void testIsDuplicate(){
        // given
        String atptOfcdcScCode = "B10";
        String sdSchulCode = "7010117";

        // when
        // 존재하는 학교
        boolean is = schoolInformationService.isDuplicateSchool(atptOfcdcScCode, sdSchulCode);
        // 존재하지 않는 학교
        boolean not = schoolInformationService.isDuplicateSchool(atptOfcdcScCode, "2313");

        // then
        Assertions.assertTrue(is);
        Assertions.assertFalse(not);
    }
}
