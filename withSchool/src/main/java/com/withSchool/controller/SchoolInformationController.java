package com.withSchool.controller;

import com.withSchool.dto.SchoolInformationDTO;
import com.withSchool.entity.SchoolInformation;
import com.withSchool.entity.User;
import com.withSchool.service.SchoolInformationService;
import com.withSchool.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/school")
public class SchoolInformationController {

    private final SchoolInformationService schoolInformationService;
    private final UserService userService;

    @ExceptionHandler
    @PostMapping("/save")
    public ResponseEntity<String> saveSchool(@RequestBody SchoolInformationDTO schoolInformationDTO){
        SchoolInformation schoolInformation = schoolInformationService.save(schoolInformationService.dtoToEntity(schoolInformationDTO));
        if(schoolInformation == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(schoolInformationDTO.getSCHUL_NM() + "의 생성에 실패하였습니다.");

        try{
            userService.registerAdmin(schoolInformationDTO);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("어드민 계정 생성중에 오류가 발생하였습니다");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(schoolInformation.getSchulNm()+ ", 학교어드민 계정이 생성되었습니다.");
    }
}
