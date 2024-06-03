package com.withSchool.repository;

import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.repository.school.SchoolInformationRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@SpringBootTest
@Transactional
public class SchoolInformationRepositoryTest {
    @Autowired
    private SchoolInformationRepository schoolInformationRepository;

    @Test
    @DisplayName("시도교육청코드와 행정표쥰코드로 학교 찾기 테스트")
    public void testFindSchoolByAtptAndSchoolCode(){
        // given
        String testAtptOfcdcScCode = "B10";
        String testSdSchulCode = "7130166";
        String failAtptOfcdcScCode = "B11";
        String failSdSchulCode = "7130167";

        String expectedSchoolName = "가원중학교";
        String failName = "가원중학교2";

        // when
        Optional<SchoolInformation> schoolInformation = schoolInformationRepository.findByAtptOfcdcScCodeAndSdSchulCode(testAtptOfcdcScCode, testSdSchulCode);

        Optional<SchoolInformation> falseSchool = schoolInformationRepository.findByAtptOfcdcScCodeAndSdSchulCode(testAtptOfcdcScCode, failSdSchulCode);
        Optional<SchoolInformation> falseSchool2 = schoolInformationRepository.findByAtptOfcdcScCodeAndSdSchulCode(failAtptOfcdcScCode, testSdSchulCode);
        Optional<SchoolInformation> falseSchool3 = schoolInformationRepository.findByAtptOfcdcScCodeAndSdSchulCode(failAtptOfcdcScCode, failSdSchulCode);

        // then
        Assertions.assertTrue(falseSchool.isEmpty());
        Assertions.assertTrue(falseSchool2.isEmpty());
        Assertions.assertTrue(falseSchool3.isEmpty());

        Assertions.assertTrue(schoolInformation.isPresent());

        Assertions.assertEquals(expectedSchoolName, schoolInformation.get().getSchulNm());
        Assertions.assertNotEquals(failName, schoolInformation.get().getSchulNm());

    }
}
