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
        IntStream.rangeClosed(1,10).forEach(i->{
            User user = User.builder()
                    .id("id"+i)
                    .password("abc"+i)
                    .email("abc"+i+"@ajou.ac.kr")
                    .name("황근출"+i)
                    .sex(false)
                    .phoneNumber("0109485718"+i%10)
                    .address("아주대학교"+i+"동")
                    .birthDate(LocalDateTime.now())
                    .accountType(i%4)
                    .userCode("asdas12as"+i)
                    .parentCode("asda"+i)
                    .build();
            userRepository.save(user);
        });
    }
}
