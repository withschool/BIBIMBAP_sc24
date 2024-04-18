package com.withSchool.service;

import com.withSchool.DTO.UserInfoDTO;
import com.withSchool.DTO.UserUpdateDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserUpdateServiceTest {
    @Autowired
    private UserUpdateService userUpdateService;

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
}
