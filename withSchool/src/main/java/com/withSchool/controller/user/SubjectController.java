package com.withSchool.controller.user;

import com.withSchool.dto.SubjectInfoDTO;
import com.withSchool.entity.User;
import com.withSchool.service.SubjectService;
import com.withSchool.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/subjects")
public class SubjectController {
    private final SubjectService subjectService;

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<SubjectInfoDTO>> findEverySubject() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return null;

        if (user.getAccountType() == 0 || user.getAccountType() == 2) {
            return ResponseEntity.ok().body(subjectService.findAllSugangByUser(user));
        } else {
            return ResponseEntity.ok().body(subjectService.findAllSubjectBySchool(user));
        }
    }

    @GetMapping("/{subjectId}")
    public ResponseEntity<SubjectInfoDTO> findOneSubject(@PathVariable Long subjectId) {
        return ResponseEntity.ok().body(subjectService.findById(subjectId));
    }
}
