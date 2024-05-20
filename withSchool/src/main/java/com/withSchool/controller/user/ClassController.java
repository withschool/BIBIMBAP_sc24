package com.withSchool.controller.user;

import com.withSchool.dto.user.BasicUserInfoDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.service.classes.ClassService;
import com.withSchool.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/classes")
public class ClassController {
    private final ClassService classService;
    private final UserService userService;


    @GetMapping("/{classId}")
    @Operation(summary = "유저의 반 정보 조회")
    public ResponseEntity<Map<String, Object>> getClassById(@PathVariable Long classId) {
        Map<String, Object> response = new HashMap<>();

        Optional<ClassInformation> classInfo = classService.getClassById(classId);
        List<BasicUserInfoDTO> basicUserInfoDTOS = userService.findAllClassInformation_ClassId();

        response.put("class", classInfo);
        response.put("users", basicUserInfoDTOS);

        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/myClass")
    @Operation(summary = "자기 반 pk 가져오기")
    public ResponseEntity<Long> findMyClass(){
        return ResponseEntity.ok().body(userService.getCurrentUserClassId());
    }

}
