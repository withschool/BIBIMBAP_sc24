package com.withSchool.controller.admin;

import com.withSchool.dto.classes.ClassDTO;
import com.withSchool.dto.csv.CsvRequestDTO;
import com.withSchool.dto.user.UserDeleteRequestDTO;
import com.withSchool.dto.school.ClientSchoolNoticeDTO;
import com.withSchool.dto.school.SchoolNoticeDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.service.classes.ClassService;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.service.csv.CsvService;
import com.withSchool.service.subject.SubjectService;
import com.withSchool.service.user.UserService;

import java.io.IOException;
import com.withSchool.service.school.SchoolNoticeService;
import com.withSchool.service.subject.SubjectService;
import com.withSchool.service.user.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static java.nio.charset.StandardCharsets.UTF_8;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/admin")
public class AdminController {
    private final SubjectService subjectService;
    private final UserService userService;
    private final ClassService classService;
    private final CsvService csvService;
    private final SchoolNoticeService schoolNoticeService;

    @PostMapping("/subjects")
    public ResponseEntity<String> createSubject(@RequestParam String subjectName) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return ResponseEntity.status(HttpStatus.NO_CONTENT).body("해당하는 유저가 없습니다.");

        try {
            Subject subject = subjectService.saveSubject(subjectName, user);
            return ResponseEntity.ok().body(subject.getSubjectName() + " 과목이 생성되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @DeleteMapping("/subjects/{subjectId}")
    public ResponseEntity<String> deleteOneSubject(@PathVariable Long subjectId) {
        try {
            subjectService.deleteById(subjectId);
            return ResponseEntity.ok().body("해당 과목이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/classes")
    public ResponseEntity<String> addClass(@RequestBody ClassDTO classDTO) {

        try {
            classService.saveClassInformation(classDTO);
            return ResponseEntity.ok().body("해당 반이 생성되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/classes/byUser")
    public ResponseEntity<List<ClassInformation>> getAllClasses(@RequestParam(required = false) Integer grade, @RequestParam(required = false) Integer inClass) {
            List<ClassInformation> searchedClass = classService.findBySchoolInformation(grade, inClass);
            return ResponseEntity.ok().body(searchedClass);
    }

    @GetMapping("/classes/{classId}")
    public ResponseEntity<Optional<ClassInformation>> getClassById(@PathVariable Long classId) {
        Optional<ClassInformation> classInfo = classService.getClassById(classId);
        return ResponseEntity.ok().body(classInfo);
    }

    @PatchMapping("/classes/{classId}")
    public ResponseEntity<String> updateClassInformation(@PathVariable Long classId, @RequestBody ClassDTO updatedClassDTO) {
        classService.updateClassInformation(classId, updatedClassDTO);
        return ResponseEntity.ok().body("해당 반이 수정되었습니다.");
    }

    @DeleteMapping("/classes/{classId}")
    public ResponseEntity<String> deleteClassInformation(@PathVariable Long classId) {
        classService.deleteClassInformation(classId);
        return ResponseEntity.ok().body("해당 반이 삭제되었습니다.");
    }

    @PostMapping("/users-file")
    public ResponseEntity<String> handleFileUpload(@RequestBody MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return ResponseEntity.status(HttpStatus.NO_CONTENT).body("no user.");

        CsvRequestDTO dto = CsvRequestDTO.builder()
                .id(user.getId())
                .file(file)
                .build();
        csvService.registerUser(dto);
        return ResponseEntity.ok().body("file upload");
    }

    // 유저 리스트를 받아서 다 삭제
    @DeleteMapping("/users")
    public ResponseEntity<String> deleteUsers(@RequestBody UserDeleteRequestDTO dto){
        userService.delete(dto);
        return ResponseEntity.ok().body("삭제 완료");
    }

    @PostMapping("/schools/notices")
    public ResponseEntity<Map<String, Object>> createNotice(@ModelAttribute ClientSchoolNoticeDTO request) {
        Map<String, Object> response = new HashMap<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User admin = userService.findById(authentication.getName());

        SchoolNoticeDTO schoolNoticeDto = SchoolNoticeDTO.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .user(admin)
                .file(request.getFile())
                .school(admin.getSchoolInformation())
                .build();


        SchoolNotice schoolNotice = schoolNoticeService.save(schoolNoticeDto);

        response.put("message", "생성되었습니다.");
        response.put("id", schoolNotice.getSchoolNoticeId());
        response.put("title", request.getTitle());
        response.put("content", request.getContent());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/schools/notices/{notice-id}")
    public ResponseEntity<Map<String, Object>> modifyOneNotice(@PathVariable(name = "notice-id") Long noticeId, @ModelAttribute ClientSchoolNoticeDTO request){
        Map<String, Object> response = new HashMap<>();

        SchoolNotice schoolNotice = schoolNoticeService.updateById(noticeId, request);
        response.put("message", "수정되었습니다.");
        response.put("id", schoolNotice.getSchoolNoticeId());
        response.put("title", schoolNotice.getTitle());
        response.put("content", schoolNotice.getContent());


        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/schools/notices/{notice-id}")
    public ResponseEntity<Map<String, Object>> deleteOneNotice(@PathVariable(name = "notice-id") Long noticeId) {
        Map<String, Object> response = new HashMap<>();

        schoolNoticeService.deleteById(noticeId);
        response.put("message", "success delete");

        return ResponseEntity.ok().body(response);
    }

}
