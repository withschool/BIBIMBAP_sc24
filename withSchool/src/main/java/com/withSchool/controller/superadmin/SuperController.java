package com.withSchool.controller.superadmin;

import com.withSchool.dto.school.SchoolInformationDTO;
import com.withSchool.dto.school.SchoolInformationListDTO;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.service.school.SchoolInformationService;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/super")
public class SuperController {
    private final SchoolInformationService schoolInformationService;
    private final UserService userService;

    @PostMapping("/schools/save")
    public ResponseEntity<String> saveSchool(@RequestBody SchoolInformationDTO schoolInformationDTO) {
        SchoolInformation schoolInformation = schoolInformationService.save(schoolInformationService.dtoToEntity(schoolInformationDTO));
        if (schoolInformation == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(schoolInformationDTO.getSCHUL_NM() + "의 생성에 실패하였습니다.");

        try{
            userService.registerAdmin(schoolInformationDTO);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("어드민 계정 생성중에 오류가 발생하였습니다");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(schoolInformation.getSchulNm()+ ", 학교어드민 계정이 생성되었습니다.");
    }
    @GetMapping("/schools")
    public ResponseEntity<List<SchoolInformationListDTO>> listSchool(){
        return ResponseEntity.status(HttpStatus.OK).body(schoolInformationService.findAll());
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
