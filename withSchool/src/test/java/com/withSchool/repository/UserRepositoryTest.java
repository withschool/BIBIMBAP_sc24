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
                    .id("GAMA ELEMENTARY SCHOOL admin")
                    .password("abc")
                    .email("abc@ajou.ac.kr")
                    .name("학교 어드민")
                    .sex(false)
                    .phoneNumber("01011112222")
                    .address("아주대학교")
                    .birthDate(LocalDateTime.now())
                    .accountType(3)
                    .userCode("asdas12as")
                    .parentCode("asda")
                    .build();
            userRepository.save(user);
    }
}
