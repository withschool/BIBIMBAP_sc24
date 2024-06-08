package com.withSchool.controller.superadmin;

import com.withSchool.dto.school.ResApplicationDefaultDTO;
import com.withSchool.dto.school.SchoolInformationDTO;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.service.school.SchoolApplicationService;
import com.withSchool.service.school.SchoolInformationService;
import com.withSchool.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/super")
public class SuperController {
    private final SchoolInformationService schoolInformationService;
    private final UserService userService;
    private final SchoolApplicationService schoolApplicationService;

    @PostMapping("/schools")
    @Operation(summary = "슈퍼 어드민의 학교 모델 등록")
    public ResponseEntity<String> saveSchool(@RequestBody SchoolInformationDTO schoolInformationDTO) {
        SchoolInformation schoolInformation = schoolInformationService.save(schoolInformationService.dtoToEntity(schoolInformationDTO));
        if (schoolInformation == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body(schoolInformationDTO.getSCHUL_NM() + "의 생성에 실패하였습니다.");

        try {
            userService.registerAdmin(schoolInformationDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body("어드민 계정 생성중에 오류가 발생하였습니다");
        }
        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                .body(schoolInformation.getSchulNm() + ", 학교어드민 계정이 생성되었습니다.");
    }

    @DeleteMapping("/schools/{schoolId}")
    @Operation(summary = "슈퍼 어드민의 학교 모델 삭제")
    public ResponseEntity<String> removeSchool(@PathVariable("schoolId") Long id) {
        try {
            schoolInformationService.delete(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body("삭제 실패");
        }
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                .body("삭제 성공");
    }

    @GetMapping("/schools/applications")
    @Operation(summary = "학교 신청서 리스트 조회", description = """
            0 - 신청
            1 - 처리 중
            2 - 처리 완료
            3 - 반려
            """)
    public ResponseEntity<List<ResApplicationDefaultDTO>> showApplicationList() {
        return ResponseEntity.ok().body(schoolApplicationService.findAll());
    }

    @GetMapping("/schools/applications/{schoolApplicationId}")
    @Operation(summary = "학교 신청서 상세 조회")
    public ResponseEntity<ResApplicationDefaultDTO> showOneApplication(@PathVariable Long schoolApplicationId){
        return ResponseEntity.ok().body(schoolApplicationService.findById(schoolApplicationId));
    }

    @PatchMapping("/schools/applications/{schoolApplicationId}")
    @Operation(summary = "학교 신청서 처리중(1) / 처리 완료(2) / 반려(3) api", description = "state에는 1,2,3 중 하나의 값을 넣어줘야 함")
    public ResponseEntity<ResApplicationDefaultDTO> changeApplicationState(@PathVariable Long schoolApplicationId, @RequestParam int state) {
        return ResponseEntity.ok().body(schoolApplicationService.changeState(schoolApplicationId, state));
    }

    @DeleteMapping("/schools/applications/{schoolApplicationId}")
    @Operation(summary = "학교 신청서 삭제")
    public ResponseEntity<String> deleteApplication(@PathVariable Long schoolApplicationId) {
        try {
            schoolApplicationService.deleteById(schoolApplicationId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body("삭제 실패: " + e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                .body("삭제 성공");
    }

    @GetMapping("/schools/subscriptions")
    @Operation(summary = "슈어는 사용중인 학교 플랜 목록을 가져올 수 있다")
    public ResponseEntity<List<>>
}
