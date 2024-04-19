package com.withSchool.service;

import com.withSchool.dto.StudentSubjectDTO;
import com.withSchool.entity.StudentSubject;
import com.withSchool.entity.User;
import com.withSchool.repository.StudentSubjectRepository;
import com.withSchool.repository.SubjectRepository;
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
                    .ssid(ss.getSsid())
                    .student(ss.getUser())
                    .subject(ss.getSubject())
                    .midtermScore(ss.getMidtermScore())
                    .finalScore(ss.getFinalScore())
                    .regDate(ss.getRegDate())
                    .build();

            studentSubjectDTOS.add(studentSubjectDTO);
        }

        return studentSubjectDTOS;
    }

    public List<User> findSugangStudent(Long subjectId) {
        return studentSubjectRepository.findUsersBySubject(subjectRepository.findById(subjectId).get());
    }
}
