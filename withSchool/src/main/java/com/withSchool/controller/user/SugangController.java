package com.withSchool.controller.user;

import com.withSchool.dto.mapping.StudentSubjectDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.mapping.StudentSubjectService;
import com.withSchool.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/sugangs")
public class SugangController {
    private final StudentSubjectService studentSubjectService;
    private final UserService userService;

    // TODO: 2024. 4. 17 수강신청 API 구현하기 - ㅇㄱㅁ
    //  파라미터 정의부터 리턴타입도 다 정해야함
    @PostMapping
    @Operation(summary = "수강신청 인데 잠정 보류")
    public ResponseEntity<String> enrolment() {
        return null;
    }

    @GetMapping
    @Operation(summary = "학생 본인의 수강 리스트 확인")
    public ResponseEntity<List<StudentSubjectDTO>> findOnesSugang() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return null;

        return ResponseEntity.ok().body(studentSubjectService.findOnesSugang(user));
    }
}
