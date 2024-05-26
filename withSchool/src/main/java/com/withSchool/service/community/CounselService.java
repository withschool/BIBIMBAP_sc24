package com.withSchool.service.community;

import com.withSchool.dto.community.ReqCounselDefaultDTO;
import com.withSchool.dto.community.ResCounselDefaultDTO;
import com.withSchool.entity.community.Counsel;
import com.withSchool.entity.user.User;
import com.withSchool.repository.community.CounselRepository;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class CounselService {
    private final CounselRepository counselRepository;
    private final UserService userService;

    public ResCounselDefaultDTO save(ReqCounselDefaultDTO req) {
        User asker = userService.getCurrentUser();
        User answerer = userService.findByUserId(req.getAnswererId());
        String category = req.getCategory();
        String requestSchedule = req.getSchedule();
        LocalDateTime schedule = LocalDateTime.parse(requestSchedule, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"));

        Counsel request = Counsel.builder()
                .akser(asker)
                .answerer(answerer)
                .category(category)
                .schedule(schedule)
                .build();
        Counsel counsel = counselRepository.save(request);

        return counsel.toResCounselDefaultDTO();
    }
}
