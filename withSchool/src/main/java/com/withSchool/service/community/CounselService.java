package com.withSchool.service.community;

import com.withSchool.dto.community.ReqCounselDefaultDTO;
import com.withSchool.dto.community.ResCounselDefaultDTO;
import com.withSchool.dto.user.BasicUserInfoDTO;
import com.withSchool.entity.community.Counsel;
import com.withSchool.entity.mapping.StudentSubject;
import com.withSchool.entity.mapping.TeacherSubject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.community.CounselRepository;
import com.withSchool.repository.mapping.StudentSubjectRepository;
import com.withSchool.repository.mapping.TeacherSubjectRepository;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CounselService {
    private final CounselRepository counselRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final StudentSubjectRepository studentSubjectRepository;
    private final TeacherSubjectRepository teacherSubjectRepository;

    public ResCounselDefaultDTO save(ReqCounselDefaultDTO req) {
        User asker = userService.getCurrentUser();
        User answerer = userService.findByUserId(req.getAnswererId());
        String category = req.getCategory();
        String requestSchedule = req.getSchedule();
        LocalDateTime schedule = LocalDateTime.parse(requestSchedule, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"));

        Counsel request = Counsel.builder()
                .asker(asker)
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
                .asker(asker)
                .answerer(answerer)
                .category(category)
                .schedule(schedule)
                .regDate(existingCounsel.getRegDate())
                .build());

        return newCounsel.toResCounselDefaultDTO();
    }

    public List<ResCounselDefaultDTO> findAllRequestedCounsel() {
        User user = userService.getCurrentUser();

        List<Counsel> counsels = counselRepository.findAllByAnswerer_UserId(user.getUserId());
        List<ResCounselDefaultDTO> dtos = new ArrayList<>();

        for(Counsel c : counsels){
            dtos.add(c.toResCounselDefaultDTO());
        }

        return dtos;
    }

    public ResCounselDefaultDTO acceptCounsel(Long counselId, int isAccept) {
        if(isAccept < 1 || isAccept > 2)throw new RuntimeException("Please check isAccept");

        Optional<Counsel> result = counselRepository.findById(counselId);
        if(result.isEmpty())throw new RuntimeException("There is no appropriate counsel");
        Counsel existingCounsel = result.get();

        Counsel newCounsel = counselRepository.save(Counsel.builder()
                .counselState(isAccept)
                .counselId(counselId)
                .asker(existingCounsel.getAsker())
                .answerer(existingCounsel.getAnswerer())
                .category(existingCounsel.getCategory())
                .schedule(existingCounsel.getSchedule())
                .regDate(existingCounsel.getRegDate())
                .build());

        return newCounsel.toResCounselDefaultDTO();
    }

    public List<ResCounselDefaultDTO> findAllMyCounsel() {
        User user = userService.getCurrentUser();
        List<Counsel> counsels = counselRepository.findAllByAsker_UserId(user.getUserId());
        List<ResCounselDefaultDTO> dtos = new ArrayList<>();

        for (Counsel c : counsels) {
            dtos.add(c.toResCounselDefaultDTO());
        }

        return dtos;
    }

    public ResCounselDefaultDTO findById(Long counselId) {
        Optional<Counsel> result = counselRepository.findById(counselId);
        if(result.isEmpty())throw new RuntimeException("There is no appropriate counsel");

        return result.get().toResCounselDefaultDTO();
    }

    public List<ResCounselDefaultDTO> findAllActivatedCounsel() {
        User user = userService.getCurrentUser();
        List<Counsel> counsels = counselRepository.findAllByAnswerer_UserIdAndCounselState(user.getUserId(), 0);

        List<ResCounselDefaultDTO> dtos = new ArrayList<>();

        for (Counsel c : counsels) {
            dtos.add(c.toResCounselDefaultDTO());
        }

        return dtos;
    }

    public List<BasicUserInfoDTO> getPartners(Long childId) {
        log.info("getPartners");

        if(childId != null || userService.getCurrentUser().getAccountType() == 0) return getPartnersByStudents(childId);
        else throw new RuntimeException("No partners");
    }

    public List<BasicUserInfoDTO> getPartnersByStudents(Long childId){
        log.info("getPartnersByStudents");

        List<BasicUserInfoDTO> response = new ArrayList<>();
        Set<BasicUserInfoDTO> uniqueDTOs = new HashSet<>();

        User user = (childId != null) ? userService.findByUserId(childId) : userService.getCurrentUser();

        List<User> classTeachers = userRepository.findByClassInformation_ClassIdAndAccountType(user.getClassInformation().getClassId(), 2);
        if(classTeachers.isEmpty()) throw new RuntimeException("No Class Teacher");

        classTeachers.stream()
                .map(User::entityToBasicUserInfoDTO)
                .forEach(dto -> {
                    if (uniqueDTOs.add(dto)) {
                        response.add(dto);
                    }
                });

        List<StudentSubject> sugangs = studentSubjectRepository.findByStudent(user);
        for (StudentSubject s : sugangs) {
            Long subjectId = s.getSubject().getSubjectId();
            List<TeacherSubject> teacherSubjects = teacherSubjectRepository.findBySubject_SubjectId(subjectId);
            teacherSubjects.stream()
                    .map(TeacherSubject::getTeacher)
                    .map(User::entityToBasicUserInfoDTO)
                    .forEach(dto -> {
                        if (uniqueDTOs.add(dto)) {
                            response.add(dto);
                        }
                    });
        }

        return response;
    }
}
