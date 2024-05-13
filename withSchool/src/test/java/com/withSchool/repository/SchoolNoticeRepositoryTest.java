package com.withSchool.repository;

import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.repository.school.SchoolNoticeRepository;
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
public class SchoolNoticeRepositoryTest {
    @Autowired
    private SchoolNoticeRepository schoolNoticeRepository;

    @Test
    @DisplayName("학교 공지사항 PK로 학교 공지사항 불러오기")
    public void testLoadSchoolNotice() {
        // given
        Long schoolNoticeId = 1L;

        // when
        Optional<SchoolNotice> response = schoolNoticeRepository.findById(schoolNoticeId);

        // then
        Assertions.assertTrue(response.isPresent());
        SchoolNotice schoolNotice = response.get();

        String schoolName = "강동고등학교";
        Assertions.assertEquals(schoolNotice.getSchoolInformation().getSchulNm(), schoolName);

        String content = "내용 2";
        String title = "공지사항 2";
        Assertions.assertEquals(content, schoolNotice.getContent());
        Assertions.assertEquals(title, schoolNotice.getTitle());

    }

    @Test
    @DisplayName("학교 PK로 학교 전체 공지사항 불러오기")
    public void testLoadAllNotciesBySchoolId(){
        // given
        Long schoolPk = 10L;

        // when
        List<SchoolNotice> schoolNotices = schoolNoticeRepository.findAllBySchoolId(schoolPk);

        // then
        int noticesCount = 16;
        Assertions.assertEquals(noticesCount, schoolNotices.size());
    }
}
