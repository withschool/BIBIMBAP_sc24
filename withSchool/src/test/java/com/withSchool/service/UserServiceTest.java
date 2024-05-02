package com.withSchool.service;

import com.withSchool.dto.user.UserDeleteRequestDTO;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    public void delete(){
        List<Long> userId = Arrays.asList(78L, 79L, 80L, 81L, 82L, 83L, 84L);
        UserDeleteRequestDTO dto = UserDeleteRequestDTO.builder()
                .userId(userId)
                .build();
        userService.delete(dto);
    }
}
