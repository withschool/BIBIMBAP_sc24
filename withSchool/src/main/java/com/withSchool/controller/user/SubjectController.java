package com.withSchool.controller.user;

import com.withSchool.dto.school.ReqNoticeDTO;
import com.withSchool.dto.school.ResNoticeDTO;
import com.withSchool.dto.subject.*;
import com.withSchool.dto.user.ResUserDefaultDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.mapping.StudentSubjectService;
import com.withSchool.service.subject.SubjectHomeworkService;
import com.withSchool.service.subject.SubjectNoticeService;
import com.withSchool.service.subject.SubjectService;
import com.withSchool.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/subjects")
public class SubjectController {
    private final SubjectService subjectService;
    private final SubjectNoticeService subjectNoticeService;
    private final StudentSubjectService studentSubjectService;
    private final UserService userService;
    private final SubjectHomeworkService subjectHomeworkService;

    @GetMapping
    @Operation(summary = "유저의 과목 리스트 조회", description = "학생과 교사는 자신이 속해있는 과목의 리스트를 조회한다. 어드민은 학교의 모든 과목의 리스트를 조회한다. 부모는 자신이 선택한 자식이 수강하는 과목의 리스트를 조회한다.")
    public ResponseEntity<List<SubjectInfoDTO>> findEverySubject(@RequestParam(value = "childId", required = false) Long childId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return null;

        if (user.getAccountType() == 0 || user.getAccountType() == 2) { // 교사 or 학생
            return ResponseEntity.ok().body(subjectService.findAllSugangByUser(user));
        } else if (user.getAccountType() == 3 || user.getAccountType() == 4) { // 어드민 or 슈어
            return ResponseEntity.ok().body(subjectService.findAllSubjectByUserSchool(user));
        } else if (user.getAccountType() == 1) { //학부모
            if (childId == null) throw new RuntimeException("학생이 선택되지 않았습니다.");

            User child = userService.findByUserId(childId);
            return ResponseEntity.ok().body(subjectService.findAllSugangByUser(child));
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
            List<ResUserDefaultDTO> userDefaultDTOS = new ArrayList<>();
            for (User u : users) {
                ResUserDefaultDTO studentListDTO = ResUserDefaultDTO.builder()
                        .userId(u.getUserId())
                        .name(u.getName())
                        .userName(u.getId())
                        .build();

                userDefaultDTOS.add(studentListDTO);
            }
            response.put("subject", subjectInfoDTO);
            response.put("students", userDefaultDTOS);

            return ResponseEntity.ok()
                    .body(response);
        } catch (Exception e) {
            response.put("errorMessage", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
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
        if (user == null) return ResponseEntity.notFound().build();

        if (semester == null) {
            return ResponseEntity.ok()
                    .body(subjectService.findSubjectsByGradeAndYear(grade, year, user));
        } else {
            return ResponseEntity.ok()
                    .body(subjectService.findSubjectsByGradeAndYearAndSemester(grade, year, semester, user));
        }
    }

    @PostMapping("/notices")
    @Operation(summary = "과목교사의 과목 공지 작성", description = "과목교사는 과목 공지를 작성할 수 있다.")
    public ResponseEntity<ResNoticeDTO> createNotice(@ModelAttribute ReqSubjectNoticeDTO request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(subjectNoticeService.save(request));
    }

    @PatchMapping("/notices/{notice-id}")
    @Operation(summary = "과목교사의 과목 공지 수정", description = "과목교사는 과목 공지를 수정할 수 있다.")
    public ResponseEntity<ResNoticeDTO> modifyOneNotice(@PathVariable(name = "notice-id") Long noticeId, @ModelAttribute ReqNoticeDTO request) {

        return ResponseEntity.ok()
                .body(subjectNoticeService.updateById(noticeId, request));
    }

    @GetMapping("/notices/{noticeId}")
    @Operation(summary = "수강유저의 과목 공지 상세 조회")
    public ResponseEntity<ResNoticeDTO> showOneNotice(@PathVariable(name = "noticeId") Long noticeId) {
        ResNoticeDTO resNoticeDTO = subjectNoticeService.findById(noticeId);
        return ResponseEntity.ok()
                .body(resNoticeDTO);
    }

    @GetMapping("/notices/list/{subjectId}")
    @Operation(summary = "수강유저의 과목 공지 리스트 조회")
    public ResponseEntity<List<ResNoticeDTO>> showAllNotices(@PathVariable("subjectId") Long subjectId) {
        List<ResNoticeDTO> classNoticeDTOS = subjectNoticeService.findAll(subjectId);
        return ResponseEntity.ok()
                .body(classNoticeDTOS);
    }

    @DeleteMapping("/notices/{notice-id}")
    @Operation(summary = "과목교사의 과목 공지 삭제", description = "과목교사는 PK를 사용하여 과목 공지를 삭제할 수 있다. ")
    public ResponseEntity<String> deleteOneNotice(@PathVariable(name = "notice-id") Long noticeId) {

        subjectNoticeService.deleteById(noticeId);

        return ResponseEntity.ok()
                .body("delete success");
    }

    @PostMapping("/homeworks")
    @Operation(summary = "과목교사의 과목 과제 생성", description = "과목교사는 원하는 과목id를 사용하여 과제를 생성할 수 있다")
    public ResponseEntity<ResHomeworkDTO> createHomework(@ModelAttribute ReqHomeworkCreateDTO reqHomeworkCreateDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subjectHomeworkService.save(reqHomeworkCreateDTO));
    }

    @GetMapping("/{subject-id}/homeworks") // 과제 리스트 가져오기
    @Operation(summary = "해당 유저의 과목 과제 리스트 불러오기", description = "과목 과제 리스트 불러오기")
    public ResponseEntity<List<ResHomeworkDTO>> getHomeworkList(@PathVariable("subject-id")Long subjectId) {
        return ResponseEntity.status(HttpStatus.OK).body(subjectHomeworkService.getList(subjectId));
    }

    @PatchMapping("/homeworks/{homework-id}")
    @Operation(summary = "과목교사의 과목 과제 수정", description = "과목 교사는 homework id를 사용하여 과제를 수정할 수 있다")
    public ResponseEntity<ResHomeworkDTO> updateHomework(@PathVariable("homework-id") Long homeworkId, @ModelAttribute ReqHomeworkCreateDTO req){
        return ResponseEntity.status(HttpStatus.OK).body(subjectHomeworkService.update(homeworkId,req));
    }

    @DeleteMapping("/homeworks/{homework-id}")
    @Operation(summary = "과목교사의 과목 과제 삭제", description = "과목 교사는 homework id를 사용하여 과제를 삭제할 수 있다")
    public ResponseEntity<String> deleteHomework(@PathVariable("homework-id") Long homeworkId){
        subjectHomeworkService.delete(homeworkId);
        return ResponseEntity.status(HttpStatus.OK).body("delete success");
    }
    @PostMapping("/students/homeworks")
    @Operation(summary = "학생의 과목 과제 제출", description = "학생은 homeworkId에 해당하는 과제를 제출할 수 있다")
    public ResponseEntity<String> submitHomework(@ModelAttribute ReqHomeworkSubmitDTO reqHomeworkSubmitDTO){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(subjectHomeworkService.submit(reqHomeworkSubmitDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/students/homeworks/{homework-id}")
    @Operation(summary = "학생의 과목 과제제출 여부 조회", description = "과목 과제 id를 이용해 학생이 과목 과제를 제출하였으면 학생의 과목 과제 제출Id를 반환")
    public ResponseEntity<Long> whetherSubmit(@PathVariable("homework-id") Long homeworkId){
        return ResponseEntity.ok().body(subjectHomeworkService.getId(homeworkId));
    }
    @GetMapping("/students/submit-homeworks/list/{homework-id}")
    @Operation(summary = "학생들이 제출한 반 과제 리스트 조회", description = "반 과제Id를 이용해 학생들이 제출한 반 과제 리스트 조회")
    public ResponseEntity<List<ResHomeworkSubmitDTO>> getSubmitList(@PathVariable("homework-id") Long homeworkId){
        return ResponseEntity.ok().body(subjectHomeworkService.getAll(homeworkId));
    }
    @GetMapping("/students/submit-homeworks/{subject-homework-submit-id}")
    @Operation(summary = "학생의 제출과제 단일조회", description = "과제제출Id를 이용해 학생이 제출한 과제 내용을 조회")
    public ResponseEntity<ResHomeworkSubmitDTO> getSubmit(@PathVariable("subject-homework-submit-id") Long subjectHomeworkSubmitId){
        return ResponseEntity.ok().body(subjectHomeworkService.getOne(subjectHomeworkSubmitId));
    }
    @PatchMapping("/students/homeworks/{subject-homework-submit-id}")
    @Operation(summary = "학생의 과목 과제 수정", description = "학생은 subject-homework-submit-id에 해당하는 과제를 수정할 수 있다")
    public ResponseEntity<String> updateSubmitHomework(@PathVariable("subject-homework-submit-id") Long subjectHomeworkSubmitId,@ModelAttribute ReqHomeworkSubmitDTO reqHomeworkSubmitDTO){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(subjectHomeworkService.updateSubmit(subjectHomeworkSubmitId,reqHomeworkSubmitDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @DeleteMapping("/students/homeworks/{subject-homework-submit-id}")
    @Operation(summary = "학생이 자신의 과제 삭제", description = "학생은 homeworkSubmitId를 사용하여 과제를 삭제할 수 있다")
    public ResponseEntity<String> deleteSubmitHomework(@PathVariable("subject-homework-submit-id") Long subjectHomeworkSubmitId){
        subjectHomeworkService.deleteSubmit(subjectHomeworkSubmitId);
        return ResponseEntity.status(HttpStatus.OK).body("delete success");
    }
}
