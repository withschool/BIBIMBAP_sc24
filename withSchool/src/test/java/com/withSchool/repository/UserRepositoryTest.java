package com.withSchool.repository;

import com.withSchool.entity.user.User;
import com.withSchool.repository.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.time.LocalDateTime;
import java.util.Optional;

@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void registerUserTest(){
            User user = User.builder()
                    .id("실험")
                    .password(passwordEncoder.encode("dd1"))
                    .email("abc123@ajou.ac.kr")
                    .name("관리자")
                    .sex(false)
                    .phoneNumber("01094857112")
                    .address("아주대학교동")
                    .birthDate("991108")
                    .accountType(3)
                    .userCode("asdas12asasd")
                    .parentCode("asda123")
                    .build();
            userRepository.save(user);
    }

    @Test
    public void find(){
        Optional<User> user=  userRepository.findById("dd1");
        if(user.isPresent()){
            System.out.println(user.get().getName());
        }
    }
}
