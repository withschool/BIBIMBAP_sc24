package com.withSchool.controller.user;

import com.withSchool.dto.school.SchoolNoticeToClientDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.school.SchoolNoticeService;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/school-notices")
public class SchoolNoticeController {
    private final UserService userService;
    private final SchoolNoticeService schoolNoticeService;

    @GetMapping("/{notice-id}")
    public ResponseEntity<Map<String, Object>> showOneNotice(@PathVariable(name = "notice-id") Long noticeId) {
        Map<String, Object> response = new HashMap<>();

        SchoolNoticeToClientDTO schoolNoticeToClientDTO = schoolNoticeService.findById(noticeId);
        response.put("notice", schoolNoticeToClientDTO);

        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> showAllNotices() {
        Map<String, Object> response = new HashMap<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User admin = userService.findById(authentication.getName());

        List<SchoolNoticeToClientDTO> schoolNoticeDTOS = schoolNoticeService.findAll(admin.getSchoolInformation().getSchoolId());

        response.put("school-notices", schoolNoticeDTOS);

        return ResponseEntity.ok().body(response);
    }
}
