package com.withSchool.feat.feat_17;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.entity.school.SchoolNoticeFile;
import com.withSchool.repository.file.NoticeFileRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class RepositoryTest {

    @Autowired
    private NoticeFileRepository noticeFileRepository;

    @Test
    public void 공지사항_파일_저장(){
        SchoolNotice schoolNotice = new SchoolNotice();
        SchoolNoticeFile schoolNoticeFile = SchoolNoticeFile.builder()
                .originalName("원래이름")
                .fileUrl("asdasdasdasdsa")
                .schoolNotice(schoolNotice)
                .build();
        SchoolNoticeFile saved = noticeFileRepository.save(schoolNoticeFile);

        assertNotNull(saved.getSchoolNoticeFileId());
        assertEquals("원래이름",saved.getOriginalName());
        assertEquals("asdasdasdasdsa",saved.getFileUrl());

    }
    @Test
    public void 공지사항_파일_조회(){
        noticeFileRepository.findBySchoolNoticeId(15L);
    }
}
