package com.withSchool.controller.admin;

import com.withSchool.entity.Subject;
import com.withSchool.entity.User;
import com.withSchool.service.SubjectService;
import com.withSchool.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final SubjectService subjectService;
    private final UserService userService;

    @PostMapping("/subjects")
    public ResponseEntity<String> createSubject(@RequestParam String subjectName) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if(user == null) return ResponseEntity.status(HttpStatus.NO_CONTENT).body("해당하는 유저가 없습니다.");

        Subject subject =  subjectService.saveSubject(subjectName, user);

        return ResponseEntity.ok().body(subject.getSubjectName() + " 수업이 생성되었습니다.");

    }

    @DeleteMapping("/subjects/{subjectId}")
    public ResponseEntity<String> deleteOneSubject(@PathVariable Long subjectId) {
        subjectService.deleteById(subjectId);

        return ResponseEntity.ok().body("해당 과목이 삭제되었습니다.");
    }
}
