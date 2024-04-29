package com.withSchool.controller.admin;

import com.withSchool.dto.classes.ClassDTO;
import com.withSchool.dto.school.ClientSchoolNoticeDTO;
import com.withSchool.dto.school.SchoolNoticeDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.service.classes.ClassService;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
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

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/admin")
public class AdminController {
    private final SubjectService subjectService;
    private final UserService userService;
    private final ClassService classService;
    private final SchoolNoticeService schoolNoticeService;

    @PostMapping("/subjects")
    public ResponseEntity<String> createSubject(@RequestParam String subjectName) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return ResponseEntity.status(HttpStatus.NO_CONTENT).body("해당하는 유저가 없습니다.");

        try {
            Subject subject = subjectService.saveSubject(subjectName, user);
            return ResponseEntity.ok().body(subject.getSubjectName() + " 수업이 생성되었습니다.");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @DeleteMapping("/subjects/{subjectId}")
    public ResponseEntity<String> deleteOneSubject(@PathVariable Long subjectId) {
        try {
            subjectService.deleteById(subjectId);
            return ResponseEntity.ok().body("해당 과목이 삭제되었습니다.");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/classes/byUser")
    public ResponseEntity<List<ClassInformation>> getAllClasses() {
        List<ClassInformation> classes = classService.findBySchoolInformation_SchoolId();
        return ResponseEntity.ok().body(classes);
    }

    @GetMapping("/classes/byUser/{grade}")
    public ResponseEntity<List<ClassInformation>> getAllClassesByGrade(@PathVariable int grade) {
        List<ClassInformation> classes = classService.findBySchoolInformation_SchoolIdAndGrade(grade);
        return ResponseEntity.ok().body(classes);
    }

    @GetMapping("/classes/byUser/{grade}/{inClass}")
    public ResponseEntity<Optional<ClassInformation>> getClassByGradeAndInClass(@PathVariable int grade, @PathVariable int inClass) {
        Optional<ClassInformation> searchedClass = classService.findBySchoolInformation_SchoolIdAndGradeAndInClass(grade, inClass);
        return ResponseEntity.ok().body(searchedClass);
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


    @PostMapping("/school-notices")
    public ResponseEntity<Map<String, Object>> createNotice(@RequestBody ClientSchoolNoticeDTO request) {
        Map<String, Object> response = new HashMap<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User admin = userService.findById(authentication.getName());
        if (admin == null) {
            String e = "해당하는 유저가 없습니다.";
            response.put("err", e);

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else if (admin.getAccountType() != 3) {
            String e = "유저가 admin이 아닙니다.";
            response.put("err", e);

            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        SchoolNoticeDTO schoolNoticeDto = SchoolNoticeDTO.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .user(admin)
                .school(admin.getSchoolInformation())
                .build();


        SchoolNotice schoolNotice = schoolNoticeService.save(schoolNoticeDto);

        response.put("message", "생성되었습니다.");
        response.put("id", schoolNotice.getSchoolNoticeId());
        response.put("title", request.getTitle());
        response.put("content", request.getContent());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/school-notices/{notice-id}")
    public ResponseEntity<Map<String, Object>> modifyOneNotice(@PathVariable(name = "notice-id") Long noticeId, @RequestBody ClientSchoolNoticeDTO request){
        Map<String, Object> response = new HashMap<>();

        SchoolNotice schoolNotice = schoolNoticeService.updateById(noticeId, request);
        response.put("message", "수정되었습니다.");
        response.put("id", schoolNotice.getSchoolNoticeId());
        response.put("title", schoolNotice.getTitle());
        response.put("content", schoolNotice.getContent());

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/school-notices/{notice-id}")
    public ResponseEntity<Map<String, Object>> deleteOneNotice(@PathVariable(name = "notice-id") Long noticeId) {
        Map<String, Object> response = new HashMap<>();

        schoolNoticeService.deleteById(noticeId);
        response.put("message", "success delete");

        return ResponseEntity.ok().body(response);
    }

}
