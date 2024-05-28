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
import java.util.Optional;

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

    public void delete(Long counselId) {
        counselRepository.deleteById(counselId);
    }

    public ResCounselDefaultDTO modify(Long counselId, ReqCounselDefaultDTO req) {
        User asker = userService.getCurrentUser();
        User answerer = userService.findByUserId(req.getAnswererId());
        String category = req.getCategory();
        String requestSchedule = req.getSchedule();
        LocalDateTime schedule = LocalDateTime.parse(requestSchedule, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"));

        Optional<Counsel> result = counselRepository.findById(counselId);
        if(result.isEmpty())throw new RuntimeException("There is no appropriate counsel");

        Counsel existingCounsel = result.get();

        Counsel newCounsel = counselRepository.save(Counsel.builder()
                .counselState(existingCounsel.getCounselState())
                .counselId(counselId)
                .akser(asker)
                .answerer(answerer)
                .category(category)
                .schedule(schedule)
                .regDate(existingCounsel.getRegDate())
                .build());

        return newCounsel.toResCounselDefaultDTO();
    }
}
