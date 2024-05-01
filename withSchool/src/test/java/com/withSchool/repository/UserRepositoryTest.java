package com.withSchool.repository;

import com.withSchool.entity.user.User;
import com.withSchool.repository.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void registerUserTest(){
            User user = User.builder()
                    .id("idas")
                    .password(passwordEncoder.encode("dd1"))
                    .email("abc@ajou.ac.kr")
                    .name("관리자")
                    .sex(false)
                    .phoneNumber("0109485718")
                    .address("아주대학교동")
                    .birthDate("999999")
                    .accountType(3)
                    .userCode("asdas12as")
                    .parentCode("asda")
                    .build();
            userRepository.save(user);
    }
}
