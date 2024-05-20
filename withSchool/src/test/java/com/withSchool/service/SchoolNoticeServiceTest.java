package com.withSchool.service;

import com.withSchool.dto.school.ReqNoticeDTO;
import com.withSchool.dto.school.ResNoticeDTO;
import com.withSchool.dto.school.SchoolNoticeDTO;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.entity.user.User;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.school.SchoolNoticeService;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
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
    @Autowired
    private UserService userService;

    @BeforeEach
    public void init(){
        User user = userService.findById("id3");
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(new UsernamePasswordAuthenticationToken(user, user.getPassword()));
    }

//    @Test
//    @DisplayName("공지 CRUD 테스트")
//    public void testSchoolNoticeCRUD(){
//        // given
//        Optional<User> response = userRepository.findById(20L);
//        Assertions.assertTrue(response.isPresent());
//        User user = response.get();
//
//        String title = "공지 테스트";
//        String content = "bla bla";
//
//        ReqNoticeDTO schoolNoticeDTO = ReqNoticeDTO.builder()
//                .title(title)
//                .content(content)
//                .build();
//
//        // when save
//        ResNoticeDTO resNoticeDTO = schoolNoticeService.save(schoolNoticeDTO);
//
//        // then
//        Assertions.assertNotNull(resNoticeDTO);
//        System.out.println(resNoticeDTO);
//
//        // when find by ID
//
//        ResNoticeDTO resNoticeDTO2 = schoolNoticeService.findById(.getSchoolNoticeId());
//
//        // then
//        Assertions.assertNotNull(resNoticeDTO2);
//        System.out.println(resNoticeDTO2);
//
//        // when find By School
//        List<ResNoticeDTO> schoolNoticeToClientDTOS = schoolNoticeService.findAll();
//
//        // then
//        Assertions.assertEquals(17, schoolNoticeToClientDTOS.size());
//        System.out.println(schoolNoticeToClientDTOS);
//
//        // when update by ID
//        ReqNoticeDTO reqNoticeDTO = ReqNoticeDTO.builder()
//                .title("notice Test")
//                .build();
//        SchoolNotice updatedNotice = schoolNoticeService.updateById(schoolNotice.getSchoolNoticeId(), reqNoticeDTO);
//
//        // then
//        Assertions.assertNotNull(updatedNotice);
//        System.out.println(updatedNotice.getTitle());
//
//        // when delete by ID
//        schoolNoticeService.deleteById(schoolNotice.getSchoolNoticeId());
//
//        ResNoticeDTO deletedNotice = schoolNoticeService.findById(schoolNotice.getSchoolNoticeId());
//        Assertions.assertNull(deletedNotice);
//    }
}
