package com.withSchool.service;

import com.withSchool.dto.UserInfoDTO;
import com.withSchool.dto.UserUpdateDTO;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserUpdateService userUpdateService;
    @Autowired
    private UserService userService;

    @Test
    public void getUserInfoTest(){
        UserInfoDTO result = userUpdateService.getUserInfo(18L);
        System.out.println(result.toString());
    }
    @Test
    public void updateUserInfoTest(){
        UserUpdateDTO dto = UserUpdateDTO.builder()
                .userId(18L)
                .id("id new")
                .password("new password")
                .email("newemail@ajou.ac.kr")
                .phoneNumber("01012345678")
                .address("new address")
                .build();
        userUpdateService.updateUserInfo(dto);
    }
    @Test
    @Transactional
    public void registerAdminTest() throws Exception {
       com.withSchool.dto.SchoolInformationDTO dto = com.withSchool.dto.SchoolInformationDTO.builder()
               .ENG_SCHUL_NM("GAMA ELEMENTARY SCHOOL")
               .build();
       userService.registerAdmin(dto);
    }
}
