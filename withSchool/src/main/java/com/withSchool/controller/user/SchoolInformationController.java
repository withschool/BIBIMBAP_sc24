package com.withSchool.controller.user;

import com.withSchool.dto.school.SchoolInformationDTO;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.service.school.SchoolInformationService;
import com.withSchool.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/schools")
public class SchoolInformationController {
    private final SchoolInformationService schoolInformationService;
    private final UserService userService;

    @GetMapping("/info")
    public ResponseEntity<SchoolInformationDTO> getSchoolInformation(@RequestParam(required = false) Long childId) {
        SchoolInformation schoolInformation = userService.getCurrentUserSchoolInformation(childId);
        SchoolInformationDTO schoolInformationDTO = schoolInformationService.entityToDTO(schoolInformation);
        return ResponseEntity.ok().body(schoolInformationDTO);
    }
  
    @GetMapping("/mySchool")
    @Operation(summary = "사용자의 학교 PK를 불러오는 API")
    public ResponseEntity<Long> findMySchool(){
        return ResponseEntity.ok().body(userService.getCurrentUserSchoolId());
    }
}
