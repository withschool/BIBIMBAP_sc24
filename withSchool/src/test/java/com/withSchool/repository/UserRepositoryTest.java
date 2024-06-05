package com.withSchool.repository;

import com.withSchool.entity.user.User;
import com.withSchool.repository.user.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

@SpringBootTest
@Transactional
public class UserRepositoryTest {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("유저 저장 테스트")
    public void registerUserTest() {
        User user = User.builder()
                .id("super")
                .password(passwordEncoder.encode("123456"))
                .email("abc123@ajou.ac.kr")
                .name("관리자")
                .sex(false)
                .phoneNumber("01094657112")
                .address("아주대학교동")
                .birthDate("991108")
                .accountType(4)
                .userCode("asdas122sasd")
                .build();
        User saveduser = userRepository.save(user);

        Assertions.assertEquals(user, saveduser);
    }

    @Test
    @DisplayName("유저 ID를 바탕으로 정보를 찾는 테스트")
    public void testFindById_String() {
        // given
        String userId = "dd1";

        User testUser = User.builder()
                .userId(30L)
                .id("dd1")
                .password(passwordEncoder.encode("dd1"))
                .email("example@example.com")
                .name("John Doe")
                .sex(true)
                .phoneNumber("1234567890")
                .address("1234 Main St, City, Country")
                .accountType(2)
                .userCode("USR1223")
                .build();


        // when
        Optional<User> response = userRepository.findById(userId);
        if (response.isPresent()) {
            System.out.println(response.get().getName());
        } else return;

        User user = response.get();

        // then
        Assertions.assertEquals(testUser.getUserCode(), user.getUserCode());
    }

    @Test
    @DisplayName("유저 PK를 바탕으로 정보를 찾는 테스트")
    public void testFindById_Long() {
        // given
        Long userPk = 30L;

        User testUser = User.builder()
                .userId(30L)
                .id("dd1")
                .password(passwordEncoder.encode("dd1"))
                .email("example@example.com")
                .name("John Doe")
                .sex(true)
                .phoneNumber("1234567890")
                .address("1234 Main St, City, Country")
                .accountType(2)
                .userCode("USR1223")
                .build();


        // when
        Optional<User> response = userRepository.findById(userPk);
        if (response.isPresent()) {
            System.out.println(response.get().getName());
        } else return;

        User user = response.get();

        // then
        Assertions.assertEquals(testUser.getUserCode(), user.getUserCode());
    }

}
