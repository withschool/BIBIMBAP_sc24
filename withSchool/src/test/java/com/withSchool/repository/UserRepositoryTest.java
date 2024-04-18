package com.withSchool.repository;

import com.withSchool.entity.User;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.stream.IntStream;

@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void registerUserTest(){
            User user = User.builder()
                    .id("idas")
                    .password("abc")
                    .email("abc@ajou.ac.kr")
                    .name("관리자")
                    .sex(false)
                    .phoneNumber("0109485718")
                    .address("아주대학교동")
                    .birthDate(LocalDateTime.now())
                    .accountType(3)
                    .userCode("asdas12as")
                    .parentCode("asda")
                    .build();
            userRepository.save(user);
    }
}
