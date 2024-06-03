package com.withSchool.controller.user;

import com.withSchool.dto.user.ReqCalendarDTO;
import com.withSchool.dto.user.ReqUpdateCalendarDTO;
import com.withSchool.dto.user.ResCalendarDTO;
import com.withSchool.service.user.CalendarService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/calendar")
public class CalendarController {
    private final CalendarService calendarService;

    @PostMapping("")
    @Operation(summary = "유저의 일정 정보 리스트를 서버로 보낸다")
    public ResponseEntity<Void> postCalendar(@RequestBody List<ReqCalendarDTO> reqCalendarDTOList){
        calendarService.postCalendar(reqCalendarDTOList);
        return ResponseEntity.ok().build();
    }
    @GetMapping("")
    @Operation(summary="유저의 일정 정보 리스트를 조회한다")
    public ResponseEntity<List<ResCalendarDTO>> getCalendarList(){
        return ResponseEntity.ok().body(calendarService.getCalendarList());
    }
    @GetMapping("{calendar-id}")
    @Operation(summary = "유정의 일정 정보 단건을 조회한다")
    public ResponseEntity<ResCalendarDTO> getCalendar(@PathVariable("calendar-id")Long calendarId){
        return ResponseEntity.ok().body(calendarService.getCalendar(calendarId));
    }
    @PatchMapping("")
    @Operation(summary = "유저의 일정 정보를 수정한다")
    public ResponseEntity<Void> updateCalendar(@RequestBody ReqUpdateCalendarDTO reqUpdateCalendarDTO){
        calendarService.updateCalendar(reqUpdateCalendarDTO);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{calendar-id}")
    @Operation(summary="유저의 일정 정보를 삭제한다")
    public ResponseEntity<Void> deleteCalendar(@PathVariable("calendar-id")Long calendarId){
        calendarService.deleteCalendar(calendarId);
        return ResponseEntity.ok().build();
    }
}
