package com.withSchool.controller.user;

import com.withSchool.dto.community.ReqCounselDefaultDTO;
import com.withSchool.dto.community.ResCounselDefaultDTO;
import com.withSchool.service.community.CounselService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/counsels")
public class CounselController {
    private final CounselService counselService;

    @PostMapping
    @Operation(summary = "상담 신청 API")
    public ResponseEntity<ResCounselDefaultDTO> applyCounsel(@RequestBody ReqCounselDefaultDTO req) {
        return ResponseEntity.ok().body(counselService.save(req));
    }

    @GetMapping
    @Operation(summary = "내가 신청한 상담 목록 조회", description = "학생, 학부모, 교사가 전부 같은 api를 씀")
    public ResponseEntity<List<ResCounselDefaultDTO>> showAllMyCounsels() {
        return ResponseEntity.ok().body(counselService.findAllMyCounsel());
    }

    @GetMapping("/{counselId}")
    @Operation(summary = "상담 단건 정보 조회")
    public ResponseEntity<ResCounselDefaultDTO> showOneCounsel(@PathVariable Long counselId){
        return ResponseEntity.ok().body(counselService.findById(counselId));
    }

    @DeleteMapping("/{counselId}")
    @Operation(summary = "신청한 상담을 삭제하여 취소하는 API")
    public ResponseEntity<String> cancelCounsel(@PathVariable Long counselId) {
        counselService.delete(counselId);
        return ResponseEntity.ok().body("Deleted");
    }

    @PatchMapping("/{counselId}")
    @Operation(summary = "신청한 상담의 내용을 수정하는 API")
    public ResponseEntity<ResCounselDefaultDTO> modifyCounsel(@PathVariable Long counselId, @RequestBody ReqCounselDefaultDTO req) {
        return ResponseEntity.ok().body(counselService.modify(counselId, req));
    }

    @GetMapping("/requested-counsels")
    @Operation(summary = "학생, 학부모, 교사의 userID를 기반으로 요청된 모든 상담 신청 리스트 확인")
    public ResponseEntity<List<ResCounselDefaultDTO>> showAllRequestedCounsel() {
        return ResponseEntity.ok().body(counselService.findAllRequestedCounsel());
    }

    @GetMapping("/requested-counsels/activated")
    @Operation(summary = "학생, 학부모, 교사의 userId를 기반으로 신청 상태인 상담 리스트를 확인")
    public ResponseEntity<List<ResCounselDefaultDTO>> showActivatedCounsel(){
        return ResponseEntity.ok().body(counselService.findAllActivatedCounsel());
    }

    @PostMapping("/{counselId}")
    @Operation(summary = "상담에 대해서 승낙/거부 선택", description = "1을 보내면 승낙 2를 보내면 반려")
    public ResponseEntity<ResCounselDefaultDTO> acceptCounsel(@PathVariable Long counselId, @RequestParam int isAccept){
        return ResponseEntity.ok().body(counselService.acceptCounsel(counselId, isAccept));
    }
}
