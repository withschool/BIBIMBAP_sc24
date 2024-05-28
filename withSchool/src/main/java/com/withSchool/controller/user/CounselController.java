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

    @DeleteMapping("/{counselId}")
    @Operation(summary = "신청한 상담을 삭제하여 취소하는 API")
    public ResponseEntity<String> cancelCounsel(@PathVariable Long counselId){
        counselService.delete(counselId);
        return ResponseEntity.ok().body("Deleted");
    }

    @PatchMapping("/{counselId}")
    @Operation(summary = "신청한 상담의 내용을 수정하는 API")
    public ResponseEntity<ResCounselDefaultDTO> modifyCounsel(@PathVariable Long counselId, @RequestBody ReqCounselDefaultDTO req) {
        return ResponseEntity.ok().body(counselService.modify(counselId, req));
    }
}
