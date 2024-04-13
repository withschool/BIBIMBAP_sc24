package com.withSchool.controller;

import com.withSchool.service.UserUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/withschool")
@RequiredArgsConstructor
public class UserController {

    private final UserUpdateService userUpdateService;

    @GetMapping("/userinfo")
    public void info(){

    }


}
