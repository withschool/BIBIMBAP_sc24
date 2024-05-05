package com.withSchool.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.withSchool.dto.school.SchoolInformationListDTO;
import com.withSchool.dto.user.PreSignUpRequestDTO;
import com.withSchool.dto.user.PreSignUpReturnDTO;
import com.withSchool.dto.user.SignUpDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.school.SchoolInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.withSchool.dto.user.SignInDTO;
import com.withSchool.JWT.JwtToken;
import com.withSchool.service.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.credentials.bucket}")
    private String bucket;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            String fileUrl = "https://kr.object.ncloudstorage.com/" +  bucket + "/" +  fileName;
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(bucket,fileName,file.getInputStream(),metadata);
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
