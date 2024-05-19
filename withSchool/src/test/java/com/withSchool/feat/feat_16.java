package com.withSchool.feat;

import com.withSchool.dto.school.ReqSchoolNoticeDTO;
import com.withSchool.dto.school.SchoolNoticeDTO;
import com.withSchool.dto.school.ResSchoolNoticeDTO;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.entity.user.User;
import com.withSchool.service.school.SchoolNoticeService;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest
public class feat_16 {
    // DONE: feat 16 공지 처리 로직 구현
    //  어드민의 학교 공지 생성/조회/수정/삭제 로직 구현

    @Autowired
    private UserService userService;

    @Autowired
    private SchoolNoticeService schoolNoticeService;

    @BeforeEach
    public void init(){
        User user = userService.findById("id3");
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(new UsernamePasswordAuthenticationToken(user, user.getPassword()));
    }

    // 어드민의 공지 생성 로직
    // 1. 쿠키로 전달받은 access token(atk)에서 유저의 pk 가져오기
    // 2. request body로 넘겨받은 공지사항의 제목, 내용을 유저의 pk, 유저가 속한 학교의 pk로 school_notice에 값 삽입
    @Test
    public void testAdminWritesNotice(){
        // 어드민 계정 id3을 atk 로부터 가져왔다고 가정

        User admin = userService.findById("id3");
        if(admin == null)return;

        String title = "공지사항 1";
        String content = "내용 1";

        SchoolNoticeDTO schoolNoticeDto = SchoolNoticeDTO.builder()
                .title(title)
                .content(content)
                .user(admin)
                .school(admin.getSchoolInformation())
                .build();


        SchoolNotice schoolNotice = schoolNoticeService.save(schoolNoticeDto);

        System.out.println(schoolNotice.getSchoolNoticeId());
    }

    // 어드민 공지 단건 조회 로직
    // 1. 전달받은 school notice의 pk로 조회
    @Test
    public void testAdminReadNotice(){
        // school notice의 pk 3으로 테스트
        ResSchoolNoticeDTO resSchoolNoticeDTO = schoolNoticeService.findById(3L);

        Map<String, ResSchoolNoticeDTO> response = new HashMap<>();
        response.put("school_notice", resSchoolNoticeDTO);
        System.out.println(resSchoolNoticeDTO.getUser());
        System.out.println(resSchoolNoticeDTO);

    }

    // 어드민이 속한 학교의 모든 학교 공지를 조회
    // 1. 어드민의 정보를 cookie로부터 받아오기
    // 2. 어드민이 속한 학교의 키를 기반으로 검색
    @Test
    public void testAdminReadAllNotices(){
        Long childId = null;

        List<ResSchoolNoticeDTO> schoolNoticeDTOS = schoolNoticeService.findAll(childId);

        for (ResSchoolNoticeDTO s : schoolNoticeDTOS) {
            System.out.println(s);
        }
    }

    // 공지사항 수정
    // 공지사항 pk를 받으면 그거 수정하기
    // 수정 가능한 것은 제목과 내용만
    @Test
    public void testAdminModifyOneNotice(){
        ReqSchoolNoticeDTO reqSchoolNoticeDTO = ReqSchoolNoticeDTO.builder()
                .title("공지10")
                .content("내용10-1")
                .build();
        schoolNoticeService.updateById(13L, reqSchoolNoticeDTO);
    }

    // 공지사항 삭제
    // 공지사항 pk를 받으면 해당 공지사항을 삭제하기
    @Test
    public void testAdminDeleteOneNotice(){
        schoolNoticeService.deleteById(14L);
    }

}
