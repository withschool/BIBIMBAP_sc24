package com.withSchool.controller.admin;

import com.withSchool.dto.classes.ClassDTO;
import com.withSchool.dto.csv.CsvRequestDTO;
import com.withSchool.dto.mapping.UserClassDTO;
import com.withSchool.dto.payment.*;
import com.withSchool.dto.school.ReqNoticeDTO;
import com.withSchool.dto.school.ResNoticeDTO;
import com.withSchool.dto.subject.ReqSubjectDefaultDTO;
import com.withSchool.dto.user.ReqUserRegisterDTO;
import com.withSchool.dto.user.ResUserInfoDTO;
import com.withSchool.dto.user.ResUserUsercodeDTO;
import com.withSchool.dto.user.ReqUserDeleteDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.service.billing.BillingService;
import com.withSchool.service.classes.ClassService;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.service.csv.CsvService;
import com.withSchool.service.school.SchoolInformationService;
import com.withSchool.service.subject.SubjectService;
import com.withSchool.service.user.UserService;

import com.withSchool.service.school.SchoolNoticeService;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final SchoolInformationService schoolInformationService;
    private final BillingService billingService;

    @PostMapping("/subjects")
    @Operation(summary = "어드민의 과목 생성", description = "어드민은 과목을 생성할 수 있다.")
    public ResponseEntity<String> createSubject(@RequestBody ReqSubjectDefaultDTO subjectDTO) {
        try {
            Subject subject = subjectService.saveSubject(subjectDTO);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body(subject.getSubjectName() + " 과목이 생성되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }

    }

    @DeleteMapping("/subjects/{subjectId}")
    @Operation(summary = "어드민의 특정 과목 삭제", description = "어드민은 과목의 PK를 사용하여 과목을 삭제할 수 있다.")
    public ResponseEntity<String> deleteOneSubject(@PathVariable Long subjectId) {
        try {
            subjectService.deleteById(subjectId);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body("해당 과목이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/classes")
    @Operation(summary = "어드민의 반 생성", description = "어드민은 반을 생성할 수 있다.")
    public ResponseEntity<String> addClass(@RequestBody ClassDTO classDTO) {
        try {
            classService.saveClassInformation(classDTO);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body("해당 반이 생성되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @PostMapping("/users/{userId}/classes/{classId}")
    @Operation(summary = "어드민의 유저 반 매핑", description = "어드민은 유저와 반을 매핑시킬수 있다.")
    public ResponseEntity<String> mapUserClass(@PathVariable Long userId, @PathVariable Long classId){
        userService.mapById(UserClassDTO.builder()
                        .classId(classId)
                        .userId(userId)
                        .build());
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/classes/byUser")
    @Operation(summary = "어드민의 반 조회(학년, 반)", description = "어드민은 학년과 반을 옵션으로 반을 검색할 수 있다.")
    public ResponseEntity<List<ClassDTO>> getAllClasses(@RequestParam(required = false) Integer grade, @RequestParam(required = false) Integer inClass) {
            List<ClassDTO> searchedClass = classService.findBySchoolInformation(grade, inClass);
            return ResponseEntity.ok()
                    .body(searchedClass);
    }

    @GetMapping("/classes/{classId}")
    @Operation(summary = "어드민의 반 상세 정보 조회", description = "어드민은 반 PK를 바탕으로 반 상세 정보를 확인할 수 있다.")
    public ResponseEntity<Optional<ClassInformation>> getClassById(@PathVariable Long classId) {
        Optional<ClassInformation> classInfo = classService.getClassById(classId);
        return ResponseEntity.ok()
                .body(classInfo);
    }

    @PatchMapping("/classes/{classId}")
    @Operation(summary = "어드민의 반 정보 수정", description = "어드민은 PK를 바탕으로 반 정보를 수정할 수 있다.")
    public ResponseEntity<String> updateClassInformation(@PathVariable Long classId, @RequestBody ClassDTO updatedClassDTO) {
        classService.updateClassInformation(classId, updatedClassDTO);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                .body("해당 반이 수정되었습니다.");
    }

    @DeleteMapping("/classes/{classId}")
    @Operation(summary = "어드민의 반 삭제", description = "어드민은 반 PK를 바탕으로 반을 삭제할 수 있다.")
    public ResponseEntity<String> deleteClassInformation(@PathVariable Long classId) {
        classService.deleteClassInformation(classId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                .body("해당 반이 삭제되었습니다.");
    }

    @PostMapping("/users-file")
    @Operation(summary = "어드민의 유저 정보 삽입", description = "어드민은 CSV 파일을 업로드하여 유저 기본정보를 삽입할 수 있다.")
    public ResponseEntity<String> handleFileUpload(@RequestBody MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findById(authentication.getName());
        if (user == null) return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body("no user.");

        CsvRequestDTO dto = CsvRequestDTO.builder()
                .id(user.getId())
                .file(file)
                .build();
        try {
            csvService.registerUser(dto);
            return ResponseEntity.ok("Users registered successfully.");

        }catch(RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/users")
    @Operation(summary = "유저 단건 추가")
    public ResponseEntity<String> addOneUser(@RequestBody ReqUserRegisterDTO reqUserRegisterDTO) {
        userService.addOneUser(reqUserRegisterDTO);
        return ResponseEntity.ok("User registered successfully.");
    }

    @GetMapping("/users")
    @Operation(summary = "로그인한 유저가 속한 학교의 모든 유저 리스트업")
    public ResponseEntity<List<ResUserInfoDTO>> showAllUsersBySchool() {
        return ResponseEntity.ok().body(userService.findAllBySchool_SchoolId());
    }

    // 유저 리스트를 받아서 다 삭제
    @DeleteMapping("/users")
    @Operation(summary = "어드민의 복수 유저 정보 삭제", description = "유저의 PK 리스트를 받아서 유저 정보를 삭제할 수 있다.")
    public ResponseEntity<String> deleteUsers(@RequestBody ReqUserDeleteDTO dto){
        userService.delete(dto);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                .body("삭제 완료");
    }

    @PostMapping("/schools/notices")
    @Operation(summary = "어드민의 학교 공지 작성", description = "어드민은 학교 공지를 작성할 수 있다.")
    public ResponseEntity<ResNoticeDTO> createNotice(@ModelAttribute ReqNoticeDTO request) {

        ResNoticeDTO resNoticeDTO = schoolNoticeService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(resNoticeDTO);
    }

    @PatchMapping("/schools/notices/{notice-id}")
    @Operation(summary = "어드민의 학교 공지 수정", description = "어드민은 학교 공지를 수정할 수 있다.")
    public ResponseEntity<Map<String, Object>> modifyOneNotice(@PathVariable(name = "notice-id") Long noticeId, @ModelAttribute ReqNoticeDTO request){

        Map<String, Object> response = new HashMap<>();

        SchoolNotice schoolNotice = schoolNoticeService.updateById(noticeId, request);
        response.put("message", "수정되었습니다.");
        response.put("id", schoolNotice.getSchoolNoticeId());
        response.put("title", schoolNotice.getTitle());
        response.put("content", schoolNotice.getContent());


        return ResponseEntity.ok()
                .body(response);
    }

    @DeleteMapping("/schools/notices/{notice-id}")
    @Operation(summary = "어드민의 학교 공지 삭제", description = "어드민은 PK를 사용하여 학교 공지를 삭제할 수 있다. ")
    public ResponseEntity<Map<String, Object>> deleteOneNotice(@PathVariable(name = "notice-id") Long noticeId) {
        Map<String, Object> response = new HashMap<>();

        schoolNoticeService.deleteById(noticeId);
        response.put("message", "삭제 성공입니다.");

        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/users/is-modififed")
    @Operation(summary = "어드민의 pw 변경 확인을 위한 API", description = "false이면 수정이 안 된 것, true이면 수정이 된 것")
    public ResponseEntity<Boolean> checkModification(){
        return ResponseEntity.ok().body(userService.isModified());
    }
    @PostMapping("/schools/{schoolId}/billingKey")
    @Operation(summary = "빌링키를 등록")
    public ResponseEntity<Void> registerBillingKey(@PathVariable Long schoolId,
                                                                   @RequestBody ReqBillingKeyDTO billingKeyDTO) {
        schoolInformationService.saveBillingKey(schoolId, billingKeyDTO.getBillingKey());
        return ResponseEntity.ok().build();
    }
    @GetMapping("/schools/{schoolId}/billingKey")
    @Operation(summary="빌링키가 있는지 확인.존재:빌링키, 없음:null")
    public ResponseEntity<String> checkBillingKey(@PathVariable Long schoolId){
        return ResponseEntity.ok().body(schoolInformationService.checkBillingKey(schoolId));
    }
    @PostMapping("/schools/{schoolId}/subscriptions")
    @Operation(summary = "체험판에서 첫 플랜 등록")
    public ResponseEntity<Void> registerFirstPlan(@PathVariable Long schoolId, @RequestBody ReqPlanDTO reqPlanDTO){
        schoolInformationService.saveFirstPlan(schoolId,reqPlanDTO);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/schools/{schoolId}/subscriptions/change")
    @Operation(summary = "기존의 플랜을 종료하고 새로운 플랜을 등록")
    public ResponseEntity<Void> changePlan(@PathVariable Long schoolId, @RequestBody ReqPlanDTO reqPlanDTO) {
        schoolInformationService.changePlan(schoolId, reqPlanDTO);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/schools/{schoolId}/currentPlan")
    @Operation(summary = "현재 사용 중인 플랜, 학교 인원 수, 다음 결제일(체험판이면 없음)을 가져오기")
    public ResponseEntity<ResCurrentPlanDTO> getCurrentPlan(@PathVariable Long schoolId) {
        ResCurrentPlanDTO currentPlan = schoolInformationService.getCurrentPlan(schoolId);
        return ResponseEntity.ok(currentPlan);
    }
    @GetMapping("/schools/{schoolId}")
    @Operation(summary = "자신의 학교의 결제 내역을 확인할 수 있다")
    public ResponseEntity<List<ResPaymentRecordDTO>> getPaymentRecord(@PathVariable Long schoolId){
        return ResponseEntity.ok(billingService.getPaymentRecord(schoolId));
    }
    @PostMapping("/schools/{schoolId}/cancelSubscription")
    @Operation(summary = "구독 해지")
    public ResponseEntity<Void> cancelSubscription(@PathVariable Long schoolId) {
        schoolInformationService.cancelSubscription(schoolId);
        return ResponseEntity.ok().build();
    }

}
