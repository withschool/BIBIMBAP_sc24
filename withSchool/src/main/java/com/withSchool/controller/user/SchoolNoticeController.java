package com.withSchool.controller.user;


import com.withSchool.dto.school.ResNoticeDTO;
import com.withSchool.service.school.SchoolNoticeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/schools/notices")
public class SchoolNoticeController {
    private final SchoolNoticeService schoolNoticeService;

    @GetMapping("/{noticeId}")
    @Operation(summary = "유저의 학교 공지 상세 조회")
    public ResponseEntity<ResNoticeDTO> showOneNotice(@PathVariable(name = "noticeId") Long noticeId) {
        ResNoticeDTO resNoticeDTO = schoolNoticeService.findById(noticeId);
        return ResponseEntity.ok()
                .body(resNoticeDTO);
    }

    @GetMapping
    @Operation(summary = "유저의 학교 공지 리스트 조회")
    public ResponseEntity<List<ResNoticeDTO>> showAllNotices() {
        List<ResNoticeDTO> schoolNoticeDTOS = schoolNoticeService.findAll();
        return ResponseEntity.ok()
                .body(schoolNoticeDTOS);
    }
}