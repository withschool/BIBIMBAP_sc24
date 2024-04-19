package com.withSchool.controller.admin;

import com.withSchool.dto.ClassDTO;
import com.withSchool.entity.ClassInformation;
import com.withSchool.service.ClassService;
import com.withSchool.entity.Subject;
import com.withSchool.entity.User;
import com.withSchool.service.SubjectService;
import com.withSchool.service.UserService;

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

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/admin")
public class AdminController {
    private final SubjectService subjectService;
    private final UserService userService;
    private final ClassService classService;

    @PostMapping("/subjects")
    public ResponseEntity<String> createSubject(@RequestParam String subjectName) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return ResponseEntity.status(HttpStatus.NO_CONTENT).body("해당하는 유저가 없습니다.");

        Subject subject = subjectService.saveSubject(subjectName, user);

        return ResponseEntity.ok().body(subject.getSubjectName() + " 수업이 생성되었습니다.");

    }

    @DeleteMapping("/subjects/{subjectId}")
    public ResponseEntity<String> deleteOneSubject(@PathVariable Long subjectId) {
        subjectService.deleteById(subjectId);

        return ResponseEntity.ok().body("해당 과목이 삭제되었습니다.");
    }

    @PostMapping("/classes/add")
    public ResponseEntity<String> addClass(@RequestBody ClassDTO classDTO) {
        classService.saveClassInformation(classDTO);
        return ResponseEntity.ok().body("해당 수업이 생성되었습니다.");
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

    @PatchMapping("/classes/{classId}/update")
    public ResponseEntity<String> updateClassInformation(@PathVariable Long classId, @RequestBody ClassDTO updatedClassDTO) {
        classService.updateClassInformation(classId, updatedClassDTO);
        return ResponseEntity.ok().body("해당 반이 수정되었습니다.");
    }

    @DeleteMapping("/classes/{classId}/delete")
    public ResponseEntity<String> deleteClassInformation(@PathVariable Long classId) {
        classService.deleteClassInformation(classId);
        return ResponseEntity.ok().body("해당 반이 삭제되었습니다.");
    }

}
