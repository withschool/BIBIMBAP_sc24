package com.withSchool.controller.admin;

import com.withSchool.dto.classes.ClassDTO;
import com.withSchool.dto.csv.CsvRequestDTO;
import com.withSchool.dto.user.UserDeleteRequestDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.service.classes.ClassService;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.service.csv.CsvService;
import com.withSchool.service.subject.SubjectService;
import com.withSchool.service.user.UserService;

import java.io.IOException;
import java.util.List;
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

    @GetMapping("/classes/{schoolId}")
    public ResponseEntity<List<ClassInformation>> getAllClassesBySchoolId(@PathVariable Long schoolId) {
        List<ClassInformation> classes = classService.findBySchoolInformation_SchoolId(schoolId);
        return ResponseEntity.ok().body(classes);
    }

    @GetMapping("/classes/{schoolId}/{grade}")
    public ResponseEntity<List<ClassInformation>> getAllClassesBySchoolIdAndGrade(@PathVariable Long schoolId, @PathVariable int grade) {
        List<ClassInformation> classes = classService.findBySchoolInformation_SchoolIdAndGrade(schoolId, grade);
        return ResponseEntity.ok().body(classes);
    }

    @GetMapping("/classes/{schoolId}/{grade}/{inClass}")
    public ResponseEntity<Optional<ClassInformation>> getAllClassesBySchoolIdAndGrade(@PathVariable Long schoolId, @PathVariable int grade, @PathVariable int inClass) {
        Optional<ClassInformation> searched_class = classService.findBySchoolInformation_SchoolIdAndGradeAndInClass(schoolId, grade, inClass);
        return ResponseEntity.ok().body(searched_class);
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
        if (user == null) return ResponseEntity.status(HttpStatus.NO_CONTENT).body("해당하는 유저가 없습니다.");

        CsvRequestDTO dto = CsvRequestDTO.builder()
                .id(user.getId())
                .file(file)
                .build();
        csvService.registerUser(dto);
        return ResponseEntity.ok().body("파일 업로드 및 처리 성공");
    }

    // 유저 리스트를 받아서 다 삭제
    @DeleteMapping("/users")
    public ResponseEntity<String> deleteUsers(@RequestBody UserDeleteRequestDTO dto){
        userService.delete(dto);
        return ResponseEntity.ok().body("삭제 완료");
    }
}