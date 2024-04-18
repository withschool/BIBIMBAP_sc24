package com.withSchool.controller.superadmin;

import com.withSchool.DTO.SchoolInformationDTO;
import com.withSchool.entity.SchoolInformation;
import com.withSchool.service.SchoolInformationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/super")
public class SuperController {
    private final SchoolInformationService schoolInformationService;

    @PostMapping("/schools/save")
    public ResponseEntity<String> saveSchool(@RequestBody SchoolInformationDTO schoolInformationDTO) {
        SchoolInformation schoolInformation = schoolInformationService.save(schoolInformationService.dtoToEntity(schoolInformationDTO));

        if(schoolInformation == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(schoolInformationDTO.getSCHUL_NM() + "의 생성에 실패하였습니다.");
        else return ResponseEntity.status(HttpStatus.CREATED).body(schoolInformation.getSchulNm() + "가 생성되었습니다.");
    }
    @DeleteMapping("/schools/{schoolId}")
    public ResponseEntity<String> removeSchool(@PathVariable("schoolId") Long id){
        try{
            schoolInformationService.delete(id);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 실패");
        }
        return ResponseEntity.status(HttpStatus.OK).body("삭제 성공");
    }
}
