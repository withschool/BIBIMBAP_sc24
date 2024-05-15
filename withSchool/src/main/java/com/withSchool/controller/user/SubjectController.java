package com.withSchool.controller.user;

import com.withSchool.dto.user.StudentListDTO;
import com.withSchool.dto.subject.SubjectInfoDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.mapping.StudentSubjectService;
import com.withSchool.service.subject.SubjectService;
import com.withSchool.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
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
    @Operation(summary = "유저의 과목 리스트 조회", description = "학생과 교사는 자신이 속해있는 과목의 리스트를 조회한다. 어드민은 학교의 모든 과목의 리스트를 조회한다. 부모는 자신이 선택한 자식이 수강하는 과목의 리스트를 조회한다.")
    public ResponseEntity<List<SubjectInfoDTO>> findEverySubject(@RequestParam("childId") Long childId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return null;

        if (user.getAccountType() == 0 || user.getAccountType() == 2) {
            return ResponseEntity.ok().body(subjectService.findAllSugangByUser(user));
        } else if (user.getAccountType() == 3 || user.getAccountType() == 4) {
            return ResponseEntity.ok().body(subjectService.findAllSubjectByUserSchool(user));
        } else if (user.getAccountType() == 1) {
            if(childId == null) throw new RuntimeException("학생이 선택되지 않았습니다.");

            User child = userService.findByUserId(childId);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body(subjectService.findAllSugangByUser(child));
        } else throw new RuntimeException("적절한 유저가 아닙니다.");
    }

    // 과목 기본 정보 + 수강 인원을 리턴
    @GetMapping("/{subjectId}")
    @Operation(summary = "과목 기본 정보 + 수강 인원을 리턴")
    public ResponseEntity<Map<String, Object>> findOneSubject(@PathVariable Long subjectId) {
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

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body(response);
        } catch (Exception e) {
            response.put("errorMessage", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body(response);
        }
    }
    @GetMapping("/options")
    @Operation(summary = "조건을 바탕으로 과목 조회")
    public ResponseEntity<List<SubjectInfoDTO>> findSubjectsByOptions(
            @RequestParam String grade,
            @RequestParam String year,
            @RequestParam(required = false) String semester
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return ResponseEntity.notFound()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                .build();

        if (semester == null) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body(subjectService.findSubjectsByGradeAndYear(grade, year, user));
        } else {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body(subjectService.findSubjectsByGradeAndYearAndSemester(grade, year, semester, user));
        }
    }

}
