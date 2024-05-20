package com.withSchool.service.subject;

import com.withSchool.dto.subject.ReqSubjectDefaultDTO;
import com.withSchool.dto.subject.SubjectInfoDTO;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.mapping.StudentSubject;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.mapping.StudentSubjectRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.stream.Collectors;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepository;
    private final SchoolInformationRepository schoolInformationRepository;
    private final StudentSubjectRepository studentSubjectRepository;
    private final UserService userService;

    public List<SubjectInfoDTO> findAllSubjectByUserSchool(User user) {
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
    // 특정 유저의 수강 정보 가져오는 메서드
    @Transactional
    public List<SubjectInfoDTO> findAllSugangByUser(User user) {
        List<StudentSubject> studentSubjects = studentSubjectRepository.findByStudent(user);
        List<Subject> subjects = new ArrayList<>();
        List<SubjectInfoDTO> subjectInfoDTOs = new ArrayList<>();

        for (StudentSubject ss : studentSubjects) {
            if (Objects.equals(ss.getSubject().getSchoolInformation().getSchoolId(), user.getSchoolInformation().getSchoolId())) {
                subjects.add(ss.getSubject());
            }
        }

        for (Subject s : subjects) {
            SubjectInfoDTO subjectInfoDTO = SubjectInfoDTO.builder()
                    .subjectName(s.getSubjectName())
                    .subjectId(s.getSubjectId())
                    .grade(s.getGrade())
                    .year(s.getYear())
                    .semester(s.getSemester())
                    .regDate(s.getRegDate())
                    .build();

            subjectInfoDTOs.add(subjectInfoDTO);
        }

        return subjectInfoDTOs;
    }

    // (DONE) 자식의 수강 정보 가져오는 메서드
    //  1. 부모-학생 매핑 테이블 참조해서 학생 정보 가져오기
    //  2. 학생 정보를 이용해서 듣는 수업을 호출하는
    //    public List<SubjectInfoDTO> findAllSugangByUser(User user) 메서드 호출하기 끝.
    // (보류) 지금 api는 자녀가 한 명일 때만 가능한 api이기 때문에 자녀가 여러 명일 때는 이 api가 쓰이면 안됨
    // 당장은 안 쓰일 거 같음
    @Transactional
    public List<SubjectInfoDTO> findChildSubjects(User child) {
        return findAllSugangByUser(child);
    }

    public Subject saveSubject(ReqSubjectDefaultDTO subjectDTO) {
        User user = userService.getCurrentUser();

        Optional<SchoolInformation> schoolInformation = schoolInformationRepository.findById(
                user.getSchoolInformation().getSchoolId());

        if (schoolInformation.isPresent()) {
            Subject subject = Subject.builder()
                    .subjectName(subjectDTO.getSubjectName())
                    .grade(subjectDTO.getSubjectGrade())
                    .year(subjectDTO.getSubjectYear())
                    .semester(subjectDTO.getSubjectSemester())
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
                    .semester(subject.get().getSemester())
                    .year(subject.get().getYear())
                    .grade(subject.get().getGrade())
                    .regDate(subject.get().getRegDate())
                    .build();

            return subjectInfoDTO;
        }
        return null;
    }

    public void deleteById(Long subjectId) {
        subjectRepository.deleteById(subjectId);
    }

    public List<SubjectInfoDTO> findSubjectsByGradeAndYear(String grade, String year, User user) {
        SchoolInformation schoolInformation = user.getSchoolInformation();
        List<Subject> subjects = subjectRepository.findBySchoolAndGradeAndYear(schoolInformation, grade, year);
        return mapToSubjectInfoDTOList(subjects);
    }

    public List<SubjectInfoDTO> findSubjectsByGradeAndYearAndSemester(String grade, String year, String semester, User user) {
        SchoolInformation schoolInformation = user.getSchoolInformation();
        List<Subject> subjects = subjectRepository.findBySchoolAndGradeAndYearAndSemester(schoolInformation, grade, year, semester);
        return mapToSubjectInfoDTOList(subjects);
    }

    private List<SubjectInfoDTO> mapToSubjectInfoDTOList(List<Subject> subjects) {
        return subjects.stream()
                .map(subject -> SubjectInfoDTO.builder()
                        .subjectId(subject.getSubjectId())
                        .subjectName(subject.getSubjectName())
                        .regDate(subject.getRegDate())
                        .build())
                .collect(Collectors.toList());
    }

}
