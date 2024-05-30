package com.withSchool.controller.user;

import com.withSchool.dto.school.ReqNoticeDTO;
import com.withSchool.dto.school.ResNoticeDTO;
import com.withSchool.dto.subject.ReqHomeworkCreateDTO;
import com.withSchool.dto.subject.ReqHomeworkSubmitDTO;
import com.withSchool.dto.subject.ResHomeworkDTO;
import com.withSchool.dto.subject.ResHomeworkSubmitDTO;
import com.withSchool.dto.user.ResUserUsercodeDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.user.User;
import com.withSchool.service.classes.ClassHomeworkService;
import com.withSchool.service.classes.ClassNoticeService;
import com.withSchool.service.classes.ClassService;
import com.withSchool.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/classes")
public class ClassController {
    private final ClassService classService;
    private final ClassNoticeService classNoticeService;
    private final UserService userService;
    private final ClassHomeworkService classHomeworkService;


    @GetMapping("/{classId}")
    @Operation(summary = "유저의 반 정보 조회")
    public ResponseEntity<Map<String, Object>> getClassById(@PathVariable Long classId) {
        Map<String, Object> response = new HashMap<>();

        Optional<ClassInformation> classInfo = classService.getClassById(classId);
        List<ResUserUsercodeDTO> basicUserInfoDTOS = userService.findAllClassInformation_ClassId();

        response.put("class", classInfo);
        response.put("users", basicUserInfoDTOS);

        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/myClass")
    @Operation(summary = "자기 반 pk 가져오기")
    public ResponseEntity<Long> findMyClass(){
        return ResponseEntity.ok().body(userService.getCurrentUserClassId());
    }

    @PostMapping("/notices")
    @Operation(summary = "교사의 반 공지 작성", description = "교사는 반 공지를 작성할 수 있다.")
    public ResponseEntity<ResNoticeDTO> createNotice(@ModelAttribute ReqNoticeDTO request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(classNoticeService.save(request));
    }
    @PatchMapping("/notices/{notice-id}")
    @Operation(summary = "교사의 반 공지 수정", description = "교사는 반 공지를 수정할 수 있다.")
    public ResponseEntity<ResNoticeDTO> modifyOneNotice(@PathVariable(name = "notice-id") Long noticeId, @ModelAttribute ReqNoticeDTO request){

        return ResponseEntity.ok()
                .body(classNoticeService.updateById(noticeId, request));
    }
    @GetMapping("/notices/{noticeId}")
    @Operation(summary = "유저의 반 공지 상세 조회")
    public ResponseEntity<ResNoticeDTO> showOneNotice(@PathVariable(name = "noticeId") Long noticeId) {
        ResNoticeDTO resNoticeDTO = classNoticeService.findById(noticeId);
        return ResponseEntity.ok()
                .body(resNoticeDTO);
    }

    @GetMapping("/notices")
    @Operation(summary = "유저의 반 공지 리스트 조회")
    public ResponseEntity<List<ResNoticeDTO>> showAllNotices(@RequestParam(value = "childId", required = false) Long childId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return null;

        if (user.getAccountType() == 0 || user.getAccountType() == 2) { // 교사 or 학생
            return ResponseEntity.ok().body(classNoticeService.findAll(user));
        }
        else if (user.getAccountType() == 1) { //학부모
            if (childId == null) throw new RuntimeException("학생이 선택되지 않았습니다.");
            User child = userService.findByUserId(childId);
            return ResponseEntity.ok()
                    .body(classNoticeService.findAll(child));
        }
        return null;
    }

    @DeleteMapping("/notices/{notice-id}")
    @Operation(summary = "교사의 반 공지 삭제", description = "교사는 PK를 사용하여 반 공지를 삭제할 수 있다. ")
    public ResponseEntity<String> deleteOneNotice(@PathVariable(name = "notice-id") Long noticeId) {

        classNoticeService.deleteById(noticeId);

        return ResponseEntity.ok()
                .body("delete success");
    }
    @PostMapping("/homeworks")
    @Operation(summary = "반 교사의 반 과제 생성", description = "반 교사는 과제를 생성할 수 있다")
    public ResponseEntity<ResHomeworkDTO> createHomework(@ModelAttribute ReqHomeworkCreateDTO reqHomeworkCreateDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(classHomeworkService.save(reqHomeworkCreateDTO));
    }

    @GetMapping("/{class-id}/homeworks") // 과제 리스트 가져오기
    @Operation(summary = "해당 유저의 반 과제 리스트 불러오기", description = "반 과제 리스트 불러오기")
    public ResponseEntity<List<ResHomeworkDTO>> getHomeworkList(@PathVariable("class-id")Long classId) {
        return ResponseEntity.status(HttpStatus.OK).body(classHomeworkService.getList(classId));
    }

    @PatchMapping("/homeworks/{homework-id}")
    @Operation(summary = "반 교사의 반 과제 수정", description = "반 교사는 homework id를 사용하여 과제를 수정할 수 있다")
    public ResponseEntity<ResHomeworkDTO> updateHomework(@PathVariable("homework-id") Long homeworkId, @ModelAttribute ReqHomeworkCreateDTO req){
        return ResponseEntity.status(HttpStatus.OK).body(classHomeworkService.update(homeworkId,req));
    }

    @DeleteMapping("/homeworks/{homework-id}")
    @Operation(summary = "반 교사의 반 과제 삭제", description = "반 교사는 homework id를 사용하여 과제를 삭제할 수 있다")
    public ResponseEntity<String> deleteHomework(@PathVariable("homework-id") Long homeworkId){
        classHomeworkService.delete(homeworkId);
        return ResponseEntity.status(HttpStatus.OK).body("delete success");
    }

    @PostMapping("/students/homeworks")
    @Operation(summary = "학생의 반 과제 제출", description = "학생은 homeworkId에 해당하는 반 과제에 제출할 수 있다")
    public ResponseEntity<String> submitHomework(@ModelAttribute ReqHomeworkSubmitDTO reqHomeworkSubmitDTO){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(classHomeworkService.submit(reqHomeworkSubmitDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/students/homeworks/{homework-id}")
    @Operation(summary = "학생의 반 과제제출 여부 조회", description = "반 과제 id를 이용해 학생이 반 과제를 제출하였으면 학생의 반 과제 제출Id를 반환")
    public ResponseEntity<Long> whetherSubmit(@PathVariable("homework-id") Long homeworkId){
        return ResponseEntity.ok().body(classHomeworkService.getId(homeworkId));
    }
    @GetMapping("/students/submit-homeworks/list/{homework-id}")
    @Operation(summary = "학생들이 제출한 반 과제 리스트 조회", description = "반 과제Id를 이용해 학생들이 제출한 반 과제 리스트 조회")
    public ResponseEntity<List<ResHomeworkSubmitDTO>> getSubmitList(@PathVariable("homework-id") Long homeworkId){
        return ResponseEntity.ok().body(classHomeworkService.getAll(homeworkId));
    }
    @GetMapping("/students/submit-homeworks/{class-homework-submit-id}")
    @Operation(summary = "학생의 제출과제 단일조회", description = "과제제출Id를 이용해 학생이 제출한 과제 내용을 조회")
    public ResponseEntity<ResHomeworkSubmitDTO> getSubmit(@PathVariable("class-homework-submit-id") Long classHomeworkSubmitId){
        return ResponseEntity.ok().body(classHomeworkService.getOne(classHomeworkSubmitId));
    }
    @PatchMapping("/students/homeworks/{class-homework-submit-id}")
    @Operation(summary = "학생의 반 과제 수정", description = "학생은 class-homework-submit-id에 해당하는 과제를 수정할 수 있다")
    public ResponseEntity<String> updateSubmitHomework(@PathVariable("class-homework-submit-id") Long classHomeworkSubmitId,@ModelAttribute ReqHomeworkSubmitDTO reqHomeworkSubmitDTO){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(classHomeworkService.updateSubmit(classHomeworkSubmitId,reqHomeworkSubmitDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @DeleteMapping("/students/homeworks/{class-homework-submit-id}")
    @Operation(summary = "학생이 자신의 과제 삭제", description = "학생은 homeworkSubmitId를 사용하여 과제를 삭제할 수 있다")
    public ResponseEntity<String> deleteSubmitHomework(@PathVariable("class-homework-submit-id") Long classHomeworkSubmitId){
        classHomeworkService.deleteSubmit(classHomeworkSubmitId);
        return ResponseEntity.status(HttpStatus.OK).body("delete success");
    }

}
