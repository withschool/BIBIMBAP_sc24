package com.withSchool.service;

import com.withSchool.dto.user.UserInfoDTO;
import com.withSchool.dto.user.UserUpdateDTO;
import com.withSchool.service.user.UserUpdateService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class UserUpdateServiceTest {
    @Autowired
    private UserUpdateService userUpdateService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void getUserInfoTest(){
        UserInfoDTO result = userUpdateService.getUserInfo(18L);
        System.out.println(result.toString());
    }
    @Test
    public void updateUserInfoTest(){
        UserUpdateDTO dto = UserUpdateDTO.builder()
                .userId(18L)
                .email("newemail@ajou.ac.kr")
                .phoneNumber("01012345678")
                .address("new address")
                .build();
        userUpdateService.updateUserInfo(dto);
    }
}
