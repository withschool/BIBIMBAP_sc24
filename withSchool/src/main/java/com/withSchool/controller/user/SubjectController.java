package com.withSchool.controller.user;

import com.withSchool.dto.StudentListDTO;
import com.withSchool.dto.SubjectInfoDTO;
import com.withSchool.entity.User;
import com.withSchool.service.StudentSubjectService;
import com.withSchool.service.SubjectService;
import com.withSchool.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/subjects")
public class SubjectController {
    private final SubjectService subjectService;
    private final StudentSubjectService studentSubjectService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<SubjectInfoDTO>> findEverySubject() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return null;

        if (user.getAccountType() == 0 || user.getAccountType() == 2) {
            return ResponseEntity.ok().body(subjectService.findAllSugangByUser(user));
        } else if (user.getAccountType() == 3 || user.getAccountType() == 4) {
            return ResponseEntity.ok().body(subjectService.findAllSubjectBySchool(user));
        } else if (user.getAccountType() == 1) {
            return ResponseEntity.ok().body(subjectService.findChildSubjects(user));
        } else return null;
    }

    // 과목 기본 정보 + 수강 인원을 리턴
    @GetMapping("/{subjectId}")
    public ResponseEntity<Map<String,Object>> findOneSubject(@PathVariable Long subjectId) {
        Map<String, Object> response = new HashMap<>();

        try {
            SubjectInfoDTO subjectInfoDTO = subjectService.findById(subjectId);
            List<User> users = studentSubjectService.findSugangStudent(subjectId);
            List<StudentListDTO> studentListDTOS = new ArrayList<>();
            for (User u : users) {
                StudentListDTO studentListDTO = StudentListDTO.builder()
                        .userId(u.getUserId())
                        .name(u.getName())
                        .id(u.getId())
                        .build();

                studentListDTOS.add(studentListDTO);
            }
            response.put("subject", subjectInfoDTO);
            response.put("students", studentListDTOS);

            return ResponseEntity.ok().body(response);
        }
        catch (Exception e){
            response.put("errorMessage", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
