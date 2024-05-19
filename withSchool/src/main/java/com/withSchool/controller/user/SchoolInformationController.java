package com.withSchool.controller.user;

import com.withSchool.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/schools")
public class SchoolInformationController {
    private final UserService userService;

    @GetMapping("/mySchool")
    @Operation(summary = "사용자의 학교 PK를 불러오는 API")
    public ResponseEntity<Long> findMySchool(){
        return ResponseEntity.ok().body(userService.getCurrentUserSchoolId());
    }
}
