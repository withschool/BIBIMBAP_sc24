package com.withSchool.service;

import com.withSchool.dto.user.UserDeleteRequestDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
@Transactional
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    @Rollback(value = false)
    public void delete() {
        List<Long> userId = Arrays.asList(78L, 79L, 80L, 81L, 82L, 83L, 84L);
        UserDeleteRequestDTO dto = UserDeleteRequestDTO.builder()
                .userId(userId)
                .build();
        userService.delete(dto);
    }

    @Test
    @DisplayName("유저 PK로 유저 찾기")
    public void testFindUserByPk() {
        // given
        Long userId = 30L;

        // when
        User user = userService.findByUserId(userId);

        // then
        Assertions.assertNotNull(user);
        Assertions.assertEquals("dd1", user.getId());

    }

    @Test
    @DisplayName("유저의 id로 유저 찾기")
    public void testFindUserById() {
        // given
        String userId = "dd1";
        String falseId = "dfdf";

        // when
        User user = userService.findById(userId);
        User nullUser = userService.findById(falseId);

        // then
        Assertions.assertNotNull(user);
        Assertions.assertEquals(30, user.getUserId());

        Assertions.assertNull(nullUser);
    }

    @Test
    @DisplayName("회원가입 전 학교 PK, 유저 이름, 생년월일, 유저코드를 사용해서 유저 정보 가져오기")
    public void testLoadUserUsingUserCode(){
        // given
        Long schoolId = 9L;
        String userName = "John Doe";
        String birthDate = "111111";
        String userCode = "USR1223";

        String falseUserCode = "UUU";

        // when
        User user = userService.findBySchoolInformationSchoolIdAndNameAndBirthDateAndUserCode(schoolId, userName, birthDate, userCode);
        User fail = userService.findBySchoolInformationSchoolIdAndNameAndBirthDateAndUserCode(schoolId, userName, birthDate, falseUserCode);

        // then
        Assertions.assertNotNull(user);
        Assertions.assertEquals("dd1", user.getId());

        Assertions.assertNull(fail);

    }
}
