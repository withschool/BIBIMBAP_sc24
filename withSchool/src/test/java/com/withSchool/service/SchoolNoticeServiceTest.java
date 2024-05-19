package com.withSchool.service;

<<<<<<< HEAD
import com.withSchool.dto.basic.ReqNoticeDTO;
import com.withSchool.dto.basic.ResNoticeDTO;
=======
import com.withSchool.dto.school.ReqSchoolNoticeDTO;
import com.withSchool.dto.school.ResSchoolNoticeDTO;
>>>>>>> a501b6c6ad700d1c4fa5b854317cbaed1e12f56b
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
<<<<<<< HEAD
        ResNoticeDTO resNoticeDTO = schoolNoticeService.findById(schoolNotice.getSchoolNoticeId());
=======
        ResSchoolNoticeDTO schoolNoticeToClientDTO = schoolNoticeService.findById(schoolNotice.getSchoolNoticeId());
>>>>>>> a501b6c6ad700d1c4fa5b854317cbaed1e12f56b

        // then
        Assertions.assertNotNull(resNoticeDTO);
        System.out.println(resNoticeDTO);

        // when find By School
<<<<<<< HEAD
        List<ResNoticeDTO> schoolNoticeToClientDTOS = schoolNoticeService.findAll(user.getSchoolInformation().getSchoolId());
=======
        List<ResSchoolNoticeDTO> schoolNoticeToClientDTOS = schoolNoticeService.findAll();
>>>>>>> a501b6c6ad700d1c4fa5b854317cbaed1e12f56b

        // then
        Assertions.assertEquals(17, schoolNoticeToClientDTOS.size());
        System.out.println(schoolNoticeToClientDTOS);

        // when update by ID
<<<<<<< HEAD
        ReqNoticeDTO reqNoticeDTO = ReqNoticeDTO.builder()
=======
        ReqSchoolNoticeDTO clientSchoolNoticeDTO = ReqSchoolNoticeDTO.builder()
>>>>>>> a501b6c6ad700d1c4fa5b854317cbaed1e12f56b
                .title("notice Test")
                .build();
        SchoolNotice updatedNotice = schoolNoticeService.updateById(schoolNotice.getSchoolNoticeId(), reqNoticeDTO);

        // then
        Assertions.assertNotNull(updatedNotice);
        System.out.println(updatedNotice.getTitle());

        // when delete by ID
        schoolNoticeService.deleteById(schoolNotice.getSchoolNoticeId());

<<<<<<< HEAD
        ResNoticeDTO deletedNotice = schoolNoticeService.findById(schoolNotice.getSchoolNoticeId());
=======
        ResSchoolNoticeDTO deletedNotice = schoolNoticeService.findById(schoolNotice.getSchoolNoticeId());
>>>>>>> a501b6c6ad700d1c4fa5b854317cbaed1e12f56b
        Assertions.assertNull(deletedNotice);
    }
}
