package com.withSchool.controller.user;

import com.withSchool.dto.community.ReqCounselDefaultDTO;
import com.withSchool.dto.community.ResCounselDefaultDTO;
import com.withSchool.service.community.CounselService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
