package com.withSchool.controller;

import com.withSchool.dto.SignUpDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.withSchool.dto.SignInDTO;
import com.withSchool.JWT.JwtToken;
import com.withSchool.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BasicController {
    private final UserService userService;

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

    @PostMapping("/test")
    public String test() {
        return "Success";
    }

    @GetMapping("/connectionTest")
    public String ct() {
        return "connection test success";
    }
}
