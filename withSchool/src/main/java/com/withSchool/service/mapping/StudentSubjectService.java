package com.withSchool.service.mapping;

import com.withSchool.dto.mapping.StudentSubjectDTO;
import com.withSchool.entity.mapping.StudentSubject;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.mapping.StudentSubjectRepository;
import com.withSchool.repository.subject.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentSubjectService {
    private final StudentSubjectRepository studentSubjectRepository;
    private final SubjectRepository subjectRepository;

    @Transactional
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
}
