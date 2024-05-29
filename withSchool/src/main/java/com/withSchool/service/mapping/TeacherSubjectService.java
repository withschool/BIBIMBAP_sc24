package com.withSchool.service.mapping;

import com.withSchool.dto.mapping.ReqTeacherSubjectMappingDTO;
import com.withSchool.dto.mapping.ResTeacherSubjectDefaultDTO;
import com.withSchool.entity.mapping.TeacherSubject;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.mapping.TeacherSubjectRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TeacherSubjectService {
    private final TeacherSubjectRepository teacherSubjectRepository;
    private final UserService userService;
    private final SubjectRepository subjectRepository;

    public ResTeacherSubjectDefaultDTO save(ReqTeacherSubjectMappingDTO reqTeacherSubjectMappingDTO) {
        User teacher = userService.findByUserId(reqTeacherSubjectMappingDTO.getTeacherId());
        Subject subject = subjectRepository.findById(reqTeacherSubjectMappingDTO.getSubjectId()).get();

        TeacherSubject teacherSubject = TeacherSubject.builder()
                .teacher(teacher)
                .subject(subject)
                .build();

        return teacherSubjectRepository.save(teacherSubject).toResTeacherSubjectDefaultDTO();
    }
}
