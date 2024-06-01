package com.withSchool.service.user;

import com.withSchool.dto.user.ReqCalendarDTO;
import com.withSchool.dto.user.ReqUpdateCalendarDTO;
import com.withSchool.dto.user.ResCalendarDTO;
import com.withSchool.entity.user.Calendar;
import com.withSchool.entity.user.User;
import com.withSchool.repository.user.CalendarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class CalendarService {

    private final UserService userService;
    private final CalendarRepository calendarRepository;
    @Transactional
    public void postCalendar(List<ReqCalendarDTO> reqCalendarDTOList) {
        User user = userService.getCurrentUser();
        for(ReqCalendarDTO r : reqCalendarDTOList){
            Calendar calendar = Calendar.builder()
                    .title(r.getTitle())
                    .start(r.getStart())
                    .end(r.getEnd())
                    .type(r.getType())
                    .description(r.getDescription())
                    .user(user)
                    .build();
            calendarRepository.save(calendar);
        }
    }

    public List<ResCalendarDTO> getCalendarList() {
        User user = userService.getCurrentUser();
        List<ResCalendarDTO> dtoList = new ArrayList<>();
        List<Calendar> calendarList = calendarRepository.findAllByUserId(user.getUserId());
        for(Calendar c : calendarList){
            ResCalendarDTO dto = ResCalendarDTO.builder()
                    .calendarId(c.getCalendarId())
                    .title(c.getTitle())
                    .start(c.getStart())
                    .end(c.getEnd())
                    .type(c.getType())
                    .description(c.getDescription())
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }
    public ResCalendarDTO getCalendar(Long calendarId) {
        User user = userService.getCurrentUser();

        Calendar findCalendar = calendarRepository.findByIdAndFetchUserEagerly(calendarId)
                .orElseThrow(()->new RuntimeException("해당 일정이 존재하지 않습니다"));
        if(!Objects.equals(findCalendar.getUser().getUserId(), user.getUserId())){
            throw new RuntimeException("사용자가 아닙니다");
        }
        return ResCalendarDTO.builder()
                .calendarId(findCalendar.getCalendarId())
                .title(findCalendar.getTitle())
                .start(findCalendar.getStart())
                .end(findCalendar.getEnd())
                .type(findCalendar.getType())
                .description(findCalendar.getDescription())
                .build();
    }

    public void updateCalendar(ReqUpdateCalendarDTO dto) {
        User user = userService.getCurrentUser();
        Calendar findResult = calendarRepository.findByIdAndFetchUserEagerly(dto.getCalendarId())
                .orElseThrow(()->new RuntimeException("해당 일정이 존재하지 않습니다"));

        if(!Objects.equals(findResult.getUser().getUserId(), user.getUserId())){
            throw new RuntimeException("사용자가 아닙니다");
        }
        Calendar calendar = Calendar.builder()
                .calendarId(dto.getCalendarId())
                .title(dto.getTitle())
                .start(dto.getStart())
                .end(dto.getEnd())
                .type(dto.getType())
                .description(dto.getDescription())
                .user(user)
                .build();
        calendarRepository.save(calendar);
    }

    public void deleteCalendar(Long calendarId) {
        User user = userService.getCurrentUser();
        Calendar findResult = calendarRepository.findByIdAndFetchUserEagerly(calendarId)
                .orElseThrow(()->new RuntimeException("해당 일정이 존재하지 않습니다"));

        if(!Objects.equals(findResult.getUser().getUserId(), user.getUserId())){
            throw new RuntimeException("사용자가 아닙니다");
        }
        calendarRepository.deleteById(calendarId);
    }
}
