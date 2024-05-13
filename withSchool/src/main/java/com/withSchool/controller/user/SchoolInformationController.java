package com.withSchool.controller.user;

import com.withSchool.dto.school.SchoolInformationDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.school.SchoolInformationService;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/schools")
public class SchoolInformationController {

    private final SchoolInformationService schoolInformationService;
    private final UserService userService;

    @GetMapping("/info")
    public ResponseEntity<SchoolInformationDTO> getSchoolInformation() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User admin = userService.findById(authentication.getName());
        Long id = admin.getSchoolInformation().getSchoolId();

        return ResponseEntity.ok().body(schoolInformationService.findById(id));
    }
}
