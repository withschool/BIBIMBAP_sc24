package com.withSchool.controller.user;

import com.withSchool.dto.mapping.ResStudentParentDefaultDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.mapping.StudentParentService;
import com.withSchool.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/mapping")
public class MappingController {
    private final UserService userService;
    private final StudentParentService studentParentService;

    @PostMapping("/student-parent")
    @Operation(summary = "부모와 학생의 매핑")
    public ResponseEntity<?> mapStudentWithParent(@RequestParam String userCode) {
        try {
            User parent = userService.getCurrentUser();
            if (parent.getAccountType() != 1)
                return ResponseEntity.badRequest()
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                        .body("학부모만 가능한 작업입니다");
            else {
                User student = userService.findByUserCode(userCode);
                if (student == null)
                    return ResponseEntity.badRequest()
                            .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                            .body("해당 학생이 존재하지 않습니다");
                studentParentService.mapping(student, parent);
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                        .body("학생 학부모 매핑 성공");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    @Operation(summary = "학부모와 매핑된 학생을 찾는 API")
    public ResponseEntity<List<ResStudentParentDefaultDTO>> findChild() {
        return ResponseEntity.ok().body(studentParentService.findChildrenByParent());
    }
}
