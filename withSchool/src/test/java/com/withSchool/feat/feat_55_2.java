package com.withSchool.feat;

import com.withSchool.dto.user.PreSignUpReturnDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class feat_55_2 {
    // DONE: FEAT 55.2 회원가입 시 사용자 코드를 사용한 인증로직 구현
    //  REQUEST: 학교, 이름, 생년월일, 코드
    //  RESPONSE: USER 정보(유저 pk, 학교이름, 이름, 생년월일)

    @Autowired
    private UserService userService;

    @Test
    public void testPreSignUpUsingStudentCode(){
        Long schoolId = 9L;
        String name = "김민수";
        String userCode = "6jEG3Hr0";

        User user = userService.findBySchoolInformationSchoolIdAndNameAndUserCode(schoolId, name, userCode);
        if(user==null) {
            System.out.println("해당하는 유저가 없습니다.");
            return;
        }

        PreSignUpReturnDTO preSignUpReturnDTO = PreSignUpReturnDTO.builder()
                .userId(user.getUserId())
                .userName(user.getName())
                .schoolName(user.getSchoolInformation().getSchulNm())
                .build();

        System.out.println(preSignUpReturnDTO);
    }
}
