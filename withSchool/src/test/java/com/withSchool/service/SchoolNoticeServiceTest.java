package com.withSchool.service;

import com.withSchool.dto.basic.ReqNoticeDTO;
import com.withSchool.dto.basic.ResNoticeDTO;
import com.withSchool.dto.school.SchoolNoticeDTO;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.entity.user.User;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.school.SchoolNoticeService;
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
public class SchoolNoticeServiceTest {
    @Autowired
    private SchoolNoticeService schoolNoticeService;
    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("공지 CRUD 테스트")
    public void testSchoolNoticeCRUD(){
        // given
        Optional<User> response = userRepository.findById(20L);
        Assertions.assertTrue(response.isPresent());
        User user = response.get();

        String title = "공지 테스트";
        String content = "bla bla";

        SchoolNoticeDTO schoolNoticeDTO = SchoolNoticeDTO.builder()
                .school(user.getSchoolInformation())
                .user(user)
                .title(title)
                .content(content)
                .build();

        // when save
        SchoolNotice schoolNotice = schoolNoticeService.save(schoolNoticeDTO);

        // then
        Assertions.assertNotNull(schoolNotice);
        System.out.println(schoolNotice);

        // when find by ID
        ResNoticeDTO resNoticeDTO = schoolNoticeService.findById(schoolNotice.getSchoolNoticeId());

        // then
        Assertions.assertNotNull(resNoticeDTO);
        System.out.println(resNoticeDTO);

        // when find By School
        List<ResNoticeDTO> schoolNoticeToClientDTOS = schoolNoticeService.findAll(user.getSchoolInformation().getSchoolId());

        // then
        Assertions.assertEquals(17, schoolNoticeToClientDTOS.size());
        System.out.println(schoolNoticeToClientDTOS);

        // when update by ID
        ReqNoticeDTO reqNoticeDTO = ReqNoticeDTO.builder()
                .title("notice Test")
                .build();
        SchoolNotice updatedNotice = schoolNoticeService.updateById(schoolNotice.getSchoolNoticeId(), reqNoticeDTO);

        // then
        Assertions.assertNotNull(updatedNotice);
        System.out.println(updatedNotice.getTitle());

        // when delete by ID
        schoolNoticeService.deleteById(schoolNotice.getSchoolNoticeId());

        ResNoticeDTO deletedNotice = schoolNoticeService.findById(schoolNotice.getSchoolNoticeId());
        Assertions.assertNull(deletedNotice);
    }
}
