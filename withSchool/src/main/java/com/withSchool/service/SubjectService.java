package com.withSchool.service;

import com.withSchool.dto.SubjectInfoDTO;
import com.withSchool.entity.SchoolInformation;
import com.withSchool.entity.StudentSubject;
import com.withSchool.entity.Subject;
import com.withSchool.entity.User;
import com.withSchool.repository.SchoolInformationRepository;
import com.withSchool.repository.StudentSubjectRepository;
import com.withSchool.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepository;
    private final SchoolInformationRepository schoolInformationRepository;
    private final StudentSubjectRepository studentSubjectRepository;

    public List<SubjectInfoDTO> findAllSubjectBySchool(User user) {
        SchoolInformation schoolInformation = user.getSchoolInformation();

        List<Subject> subjects = subjectRepository.findBySchool(schoolInformation);
        List<SubjectInfoDTO> subjectInfoDTOs = new ArrayList<>();

        for (Subject s : subjects) {
            SubjectInfoDTO subjectInfoDTO = SubjectInfoDTO.builder()
                    .subjectName(s.getSubjectName())
                    .subjectId(s.getSubjectId())
                    .regDate(s.getRegDate())
                    .build();

            subjectInfoDTOs.add(subjectInfoDTO);
        }

        return subjectInfoDTOs;
    }


    // 학생 교사에 대해서 자신이 속해있는 수업을 list 하기 위한 메서드
    // Student_Subject 테이블에서 user 정보로 SELECT 해오기
    public List<SubjectInfoDTO> findAllSugangByUser(User user) {
        List<StudentSubject> studentSubjects = studentSubjectRepository.findByStudent(user);
        List<Subject> subjects = new ArrayList<>();
        List<SubjectInfoDTO> subjectInfoDTOs = new ArrayList<>();

        for (StudentSubject ss : studentSubjects) {
            if (ss.getSubject().getSchoolInformation() == user.getSchoolInformation()) {
                subjects.add(ss.getSubject());
            }
        }

        for (Subject s : subjects) {
            SubjectInfoDTO subjectInfoDTO = SubjectInfoDTO.builder()
                    .subjectName(s.getSubjectName())
                    .subjectId(s.getSubjectId())
                    .regDate(s.getRegDate())
                    .build();

            subjectInfoDTOs.add(subjectInfoDTO);
        }

        return subjectInfoDTOs;
    }

    // TODO 이거 추가해야 함
    //  1. 부모-학생 매핑 테이블 참조해서 학생 정보 가져오기
    //  2. 학생 정보를 이용해서 듣는 수업을 호출하는
    //    public List<SubjectInfoDTO> findAllSugangByUser(User user) 메서드 호출하기 끝.
    public List<SubjectInfoDTO> findChildSubjects(User user) {

        return null;
    }

    public Subject saveSubject(String subjectName, User user) {

        Optional<SchoolInformation> schoolInformation = schoolInformationRepository.findById(
                user.getSchoolInformation().getSchoolId());

        if (schoolInformation.isPresent()) {
            Subject subject = Subject.builder()
                    .subjectName(subjectName)
                    .schoolInformation(schoolInformation.get())
                    .build();

            return subjectRepository.save(subject);
        } else {
            return null;
        }
    }

    public SubjectInfoDTO findById(Long subjectId) {
        Optional<Subject> subject = subjectRepository.findById(subjectId);

        if (subject.isPresent()) {
            SubjectInfoDTO subjectInfoDTO = SubjectInfoDTO.builder()
                    .subjectId(subject.get().getSubjectId())
                    .subjectName(subject.get().getSubjectName())
                    .regDate(subject.get().getRegDate())
                    .build();

            return subjectInfoDTO;
        }
        return null;
    }

    public void deleteById(Long subjectId) {
        subjectRepository.deleteById(subjectId);
    }

}
