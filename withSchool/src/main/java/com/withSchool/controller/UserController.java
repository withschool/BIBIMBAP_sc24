package com.withSchool.controller;

import com.withSchool.dto.SignUpDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.withSchool.DTO.SignInDTO;
import com.withSchool.JWT.JwtToken;
import com.withSchool.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody SignUpDTO userDto) {
        userService.register(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully.");
      
    @PostMapping("/signIn")
    public JwtToken signIn(@RequestBody SignInDTO signInDTO) {
        String id = signInDTO.getId();
        String password = signInDTO.getPassword();
        JwtToken jwtToken = userService.signIn(id, password);

        log.info("request username = {}, password = {}", id, password);
        log.info("jwtToken accessToken = {}, refreshToken = {}", jwtToken.getAccessToken(), jwtToken.getRefreshToken());

        return jwtToken;
    }

    @PostMapping("/test")
    public String test(){
        return "Success";
    }
}
