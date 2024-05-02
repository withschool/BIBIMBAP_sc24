package com.withSchool.controller;

import com.withSchool.dto.school.SchoolInformationListDTO;
import com.withSchool.dto.user.PreSignUpRequestDTO;
import com.withSchool.dto.user.PreSignUpReturnDTO;
import com.withSchool.dto.user.SignUpDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.school.SchoolInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.withSchool.dto.user.SignInDTO;
import com.withSchool.JWT.JwtToken;
import com.withSchool.service.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/basic")
public class BasicController {
    private final UserService userService;
    private final SchoolInformationService schoolInformationService;

    @PostMapping("/pre-sign-up")
    public ResponseEntity<Map<String, Object>> preRegisterUser(@RequestBody PreSignUpRequestDTO preSignUpRequestDTO) {
        Map<String, Object> response = new HashMap<>();

        User user = userService.findBySchoolInformationSchoolIdAndNameAndBirthDateAndUserCode(preSignUpRequestDTO.getSchoolId(), preSignUpRequestDTO.getUserName(), preSignUpRequestDTO.getBirthDate(), preSignUpRequestDTO.getUserCode());
        if(user==null) {
            response.put("message", "해당하는 유저가 없습니다.");
            return ResponseEntity.ok().body(response);
        }

        PreSignUpReturnDTO preSignUpReturnDTO = PreSignUpReturnDTO.builder()
                .userId(user.getUserId())
                .userName(user.getName())
                .schoolName(user.getSchoolInformation().getSchulNm())
                .birthDate(user.getBirthDate())
                .build();

        response.put("user", preSignUpReturnDTO);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<String> registerUser(@RequestBody SignUpDTO userDto) {
        userService.register(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("User.java registered successfully.");
    }

    @PostMapping("/sign-in")
    public JwtToken signIn(@RequestBody SignInDTO signInDTO) {
        String id = signInDTO.getId();
        String password = signInDTO.getPassword();
        JwtToken jwtToken = userService.signIn(id, password);

        log.info("request username = {}, password = {}", id, password);
        log.info("jwtToken accessToken = {}, refreshToken = {}", jwtToken.getAccessToken(), jwtToken.getRefreshToken());

        return jwtToken;
    }
    @GetMapping("/schools")
    public ResponseEntity<List<SchoolInformationListDTO>> listSchool(){
        return ResponseEntity.status(HttpStatus.OK).body(schoolInformationService.findAll());
    }

    @PostMapping("/test")
    public String test() {
        return "Success";
    }

    @GetMapping("/connectionTest")
    public String ct() {
        return "connection test success";
    }
}
