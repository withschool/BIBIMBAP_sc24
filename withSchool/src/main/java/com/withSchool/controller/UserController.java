package com.withSchool.controller;

import com.withSchool.dto.SignUpDTO;
import com.withSchool.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody SignUpDTO userDto) {
        userService.register(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully.");
    }
}
