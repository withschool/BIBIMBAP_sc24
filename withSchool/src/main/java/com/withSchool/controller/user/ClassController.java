package com.withSchool.controller.user;

import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.service.classes.ClassService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/classes")
public class ClassController {
    private final ClassService classService;


    @GetMapping("/classes/{classId}")
    @Operation(summary = "유저의 학교 정보 조회")
    public ResponseEntity<Optional<ClassInformation>> getClassById(@PathVariable Long classId) {
        Optional<ClassInformation> classInfo = classService.getClassById(classId);

        return ResponseEntity.ok()
                .body(classInfo);
    }

}
