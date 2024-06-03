package com.withSchool.service.mapping;

import com.withSchool.dto.mapping.ReqStudentSubjectScoreDTO;
import com.withSchool.dto.mapping.ResStudentSubjectDefaultDTO;
import com.withSchool.dto.mapping.StudentSubjectDTO;
import com.withSchool.dto.mapping.UserScoreDTO;
import com.withSchool.entity.mapping.StudentSubject;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.mapping.StudentSubjectRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentSubjectService {
    private final StudentSubjectRepository studentSubjectRepository;
    private final SubjectRepository subjectRepository;
    private final UserService userService;

    public List<StudentSubjectDTO> findOnesSugang(User user) {
        List<StudentSubject> studentSubjects = studentSubjectRepository.findByStudent(user);
        List<StudentSubjectDTO> studentSubjectDTOS = new ArrayList<>();

        for (StudentSubject ss : studentSubjects) {
            StudentSubjectDTO studentSubjectDTO = StudentSubjectDTO.builder()
                    .studentSubjectId(ss.getStudentSubjectId())
                    .student(ss.getUser().getName())
                    .subject(ss.getSubject().getSubjectName())
                    .midtermScore(ss.getMidtermScore())
                    .finalScore(ss.getFinalScore())
                    .activityScore(ss.getActivityScore())
                    .totalScore(ss.getTotalScore())
                    .regDate(ss.getRegDate())
                    .build();

            studentSubjectDTOS.add(studentSubjectDTO);
        }

        return studentSubjectDTOS;
    }

    public List<User> findSugangStudent(Long subjectId) {
        return studentSubjectRepository.findUsersBySubject(subjectRepository.findById(subjectId).get());
    }

    public void register(User user, Subject subject) {
        StudentSubject studentSubject = StudentSubject.builder()
                .subject(subject)
                .user(user)
                .build();

        studentSubjectRepository.save(studentSubject);
    }

    @PreAuthorize("hasRole('TEACHER')")
    public void updateScore(ReqStudentSubjectScoreDTO request) {
        String type = request.getType();

        for (UserScoreDTO u : request.getUserScoreList()) {
            Optional<StudentSubject> res = studentSubjectRepository.findById(u.getStudentSubjectId());
            if(res.isEmpty())throw new RuntimeException("There is no appropriate user-subject mapping");

            StudentSubject studentSubject = res.get();
            int activityScore, finalScore, midtermScore, totalScore;

            switch (type) {
                case "mid" -> {
                    activityScore = studentSubject.getActivityScore();
                    finalScore = studentSubject.getFinalScore();
                    totalScore = studentSubject.getTotalScore();

                    midtermScore = u.getScore();
                }
                case "final" -> {
                    activityScore = studentSubject.getActivityScore();
                    midtermScore = studentSubject.getMidtermScore();
                    totalScore = studentSubject.getTotalScore();

                    finalScore = u.getScore();
                }
                case "activity" -> {
                    midtermScore = studentSubject.getMidtermScore();
                    finalScore = studentSubject.getFinalScore();
                    totalScore = studentSubject.getTotalScore();

                    activityScore = u.getScore();
                }
                default -> throw new RuntimeException("Unavailable type");
            }

            StudentSubject result = StudentSubject.builder()
                    .studentSubjectId(studentSubject.getStudentSubjectId())
                    .subject(studentSubject.getSubject())
                    .midtermScore(midtermScore)
                    .finalScore(finalScore)
                    .activityScore(activityScore)
                    .totalScore(totalScore)
                    .user(studentSubject.getUser())
                    .build();

            studentSubjectRepository.save(result);
        }
    }

    @PreAuthorize("hasRole('TEACHER')")
    public List<ResStudentSubjectDefaultDTO> findStudentsScore(Long subjectId) {
        List<StudentSubject> studentSubjects = studentSubjectRepository.findBySubject_SubjectId(subjectId);
        List<ResStudentSubjectDefaultDTO> response = new ArrayList<>();

        for (StudentSubject s : studentSubjects) {
            response.add(s.toUserScoreDTO());
        }

        return response;
    }

    public ResStudentSubjectDefaultDTO findOnesScore(Long subjectId, Long childId) {
        User currentUser = (childId != null) ? userService.findByUserId(childId) : userService.getCurrentUser();
        StudentSubject studentSubject = studentSubjectRepository.findByUser_UserIdAndSubject_SubjectId(currentUser.getUserId(), subjectId)
                .orElseThrow(() -> new RuntimeException("There is no appropriate data"));

        return studentSubject.toUserScoreDTO();
    }

}
