package com.withSchool.controller;

import com.withSchool.dto.SchoolInformationDTO;
import com.withSchool.entity.SchoolInformation;
import com.withSchool.service.SchoolInformationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/school")
public class SchoolInformationController {

    @Autowired
    private SchoolInformationService schoolInformationService;

    @PostMapping("/save")
    private ResponseEntity<String> saveSchool(@RequestBody SchoolInformationDTO schoolInformationDTO) {
        SchoolInformation schoolInformation = schoolInformationService.save(schoolInformationService.dtoToEntity(schoolInformationDTO));

        if(schoolInformation == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(schoolInformationDTO.getSCHUL_NM() + "의 생성에 실패하였습니다.");
        else return ResponseEntity.status(HttpStatus.CREATED).body(schoolInformation.getSchulNm() + "가 생성되었습니다.");
    }
}
