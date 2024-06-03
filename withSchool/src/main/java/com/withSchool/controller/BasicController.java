package com.withSchool.controller;

import com.withSchool.dto.school.ReqApplicationDefaultDTO;
import com.withSchool.dto.school.ResApplicationDefaultDTO;
import com.withSchool.dto.school.SchoolInformationListDTO;
import com.withSchool.dto.user.*;
import com.withSchool.entity.user.User;
import com.withSchool.service.school.SchoolApplicationService;
import com.withSchool.service.school.SchoolInformationService;
import com.withSchool.service.user.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import com.withSchool.JWT.JwtTokenProvider;
import com.withSchool.dto.user.SignUpDTO;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.withSchool.JWT.JwtToken;
import com.withSchool.service.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final JwtTokenProvider jwtTokenProvider;
    private final NotificationService notificationService;
    private final SchoolApplicationService schoolApplicationService;


    @PostMapping("/pre-sign-up")
    @Operation(summary = "회원가입 전 유저 코드로 유저 정보 불러오기")
    public ResponseEntity<Map<String, Object>> preRegisterUser(@RequestBody PreSignUpRequestDTO preSignUpRequestDTO) {
        Map<String, Object> response = new HashMap<>();

        User user = userService.findBySchoolInformationSchoolIdAndNameAndUserCode(preSignUpRequestDTO.getSchoolId(), preSignUpRequestDTO.getUserName(), preSignUpRequestDTO.getUserCode());
        if(user==null) {
            response.put("message", "해당하는 유저가 없습니다.");
            return ResponseEntity.ok()
                    .body(response);
        }

        PreSignUpReturnDTO preSignUpReturnDTO = PreSignUpReturnDTO.builder()
                .userId(user.getUserId())
                .userName(user.getName())
                .schoolName(user.getSchoolInformation().getSchulNm())
                .build();

        response.put("user", preSignUpReturnDTO);
        return ResponseEntity.ok()
                .body(response);
    }

    @PostMapping("/sign-up")
    @Operation(summary = "회원가입")
    public ResponseEntity<String> registerUser(@RequestBody SignUpDTO userDto) {
        try{
            userService.register(userDto);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User.java registered successfully.");
    }

    @PostMapping("/sign-in")
    @Operation(summary = "로그인")
    public JwtToken signIn(@RequestBody SignInDTO signInDTO) {
        String id = signInDTO.getId();
        String password = signInDTO.getPassword();
        JwtToken jwtToken = userService.signIn(id, password);

        log.info("request username = {}, password = {}", id, password);
        log.info("jwtToken accessToken = {}, refreshToken = {}", jwtToken.getAccessToken(), jwtToken.getRefreshToken());

        return jwtToken;
    }
    @GetMapping("/schools")
    @Operation(summary = "등록된 학교 리스트 불러오기")
    public ResponseEntity<List<SchoolInformationListDTO>> listSchool(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(schoolInformationService.findAll());
    }

    @GetMapping("/is-duplicated")
    @Operation(summary = "아이디 중복 검증")
    public ResponseEntity<Boolean> isDuplicated(@RequestParam("id") String id){
        return ResponseEntity.ok()
                .body(userService.isDuplicated(id));
    }

    @PostMapping("/sign-out")
    public ResponseEntity<?> signOut(HttpServletRequest request) {
        // 현재 요청에 사용된 토큰을 가져옴
        String token = jwtTokenProvider.resolveToken(request);

        // 블랙리스트에 토큰 추가
        jwtTokenProvider.addToBlacklist(token);

        // 현재 사용자의 컨텍스트를 비움
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/test")
    public String test() {
        User user = userService.getCurrentUser();
        String type= "학교공지";
        String title = "캡스톤디자인 제출 안내";
        notificationService.sendSMS(user, type, title, false);
        return "Success";
    }

    @GetMapping("/connectionTest")
    public String ct() {
        return "connection test success";
    }

    @PostMapping("/schools/applications")
    @Operation(summary = "학교 신청서 제출")
    public ResponseEntity<ResApplicationDefaultDTO> submitApplication(@RequestBody ReqApplicationDefaultDTO reqApplicationDefaultDTO) {
        return ResponseEntity.ok().body(schoolApplicationService.save(reqApplicationDefaultDTO));
    }

}
