package com.withSchool.service.subject;

import com.withSchool.dto.subject.ReqSubjectDefaultDTO;
import com.withSchool.dto.subject.SubjectInfoDTO;
import com.withSchool.entity.mapping.StudentSubject;
import com.withSchool.entity.mapping.TeacherSubject;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.mapping.StudentSubjectRepository;
import com.withSchool.repository.mapping.TeacherSubjectRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class SubjectServiceTest {

    @Mock
    private SubjectRepository subjectRepository;

    @Mock
    private SchoolInformationRepository schoolInformationRepository;

    @Mock
    private StudentSubjectRepository studentSubjectRepository;

    @Mock
    private TeacherSubjectRepository teacherSubjectRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private SubjectService subjectService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAllSubjectByUserSchool() {
        User user = mock(User.class);
        SchoolInformation schoolInformation = new SchoolInformation();
        when(user.getSchoolInformation()).thenReturn(schoolInformation);

        Subject subject1 = Subject.builder()
                .subjectId(1L)
                .subjectName("Math")
                .grade("10")
                .year("2024")
                .semester("1")
                .regDate(LocalDateTime.now())
                .schoolInformation(schoolInformation)
                .build();

        Subject subject2 = Subject.builder()
                .subjectId(2L)
                .subjectName("Science")
                .grade("10")
                .year("2024")
                .semester("1")
                .regDate(LocalDateTime.now())
                .schoolInformation(schoolInformation)
                .build();

        when(subjectRepository.findBySchool(schoolInformation)).thenReturn(List.of(subject1, subject2));

        List<SubjectInfoDTO> subjects = subjectService.findAllSubjectByUserSchool(user);

        assertNotNull(subjects);
        assertEquals(2, subjects.size());
        assertEquals("Math", subjects.get(0).getSubjectName());
        assertEquals("Science", subjects.get(1).getSubjectName());

        verify(subjectRepository).findBySchool(schoolInformation);
    }

    @Test
    void testFindAllSugangByUserForStudent() {
        User user = mock(User.class);
        SchoolInformation schoolInformation = SchoolInformation.builder()
                .schoolId(3L)
                .build();
        when(user.getAccountType()).thenReturn(0);
        when(user.getSchoolInformation()).thenReturn(schoolInformation);

        Subject subject = Subject.builder()
                .subjectId(1L)
                .subjectName("Math")
                .grade("10")
                .year("2024")
                .semester("1")
                .schoolInformation(schoolInformation)
                .regDate(LocalDateTime.now())
                .build();

        StudentSubject studentSubject = StudentSubject.builder()
                .user(user)
                .subject(subject)
                .build();

        when(studentSubjectRepository.findByStudent(user)).thenReturn(List.of(studentSubject));

        List<SubjectInfoDTO> subjects = subjectService.findAllSugangByUser(user);

        assertNotNull(subjects);
        assertEquals(1, subjects.size());
        assertEquals("Math", subjects.get(0).getSubjectName());

        verify(studentSubjectRepository).findByStudent(user);
    }

    @Test
    void testFindAllSugangByUserForTeacher() {
        User user = mock(User.class);
        SchoolInformation schoolInformation = SchoolInformation.builder()
                .schoolId(3L)
                .build();
        when(user.getAccountType()).thenReturn(2);
        when(user.getSchoolInformation()).thenReturn(schoolInformation);

        Subject subject = Subject.builder()
                .subjectId(1L)
                .subjectName("Math")
                .grade("10")
                .year("2024")
                .semester("1")
                .schoolInformation(schoolInformation)
                .regDate(LocalDateTime.now())
                .build();

        TeacherSubject teacherSubject = TeacherSubject.builder()
                .teacher(user)
                .subject(subject)
                .build();

        when(teacherSubjectRepository.findByTeacher(user)).thenReturn(List.of(teacherSubject));

        List<SubjectInfoDTO> subjects = subjectService.findAllSugangByUser(user);

        assertNotNull(subjects);
        assertEquals(1, subjects.size());
        assertEquals("Math", subjects.get(0).getSubjectName());

        verify(teacherSubjectRepository).findByTeacher(user);
    }

    @Test
    void testSaveSubject() {
        // Mocking user and school information
        User user = mock(User.class);
        SchoolInformation schoolInformation = SchoolInformation.builder()
                .schoolId(3L)
                .build();
        when(user.getSchoolInformation()).thenReturn(schoolInformation);
        when(userService.getCurrentUser()).thenReturn(user);

        // Creating a mock ReqSubjectDefaultDTO object
        ReqSubjectDefaultDTO reqSubjectDefaultDTO = ReqSubjectDefaultDTO.builder()
                .subjectName("Math")
                .subjectGrade("10")
                .subjectYear("2024")
                .subjectSemester("1")
                .build();

        // Mocking the behavior of schoolInformationRepository.findById()
        when(schoolInformationRepository.findById(any(Long.class))).thenReturn(Optional.of(schoolInformation));

        // Creating a mock Subject object
        Subject subject = Subject.builder()
                .subjectId(1L)
                .subjectName("Math")
                .grade("10")
                .year("2024")
                .semester("1")
                .schoolInformation(schoolInformation)
                .build();

        // Mocking the behavior of subjectRepository.save()
        when(subjectRepository.save(any(Subject.class))).thenReturn(subject);

        // Calling the method to be tested
        Subject savedSubject = subjectService.saveSubject(reqSubjectDefaultDTO);

        // Assertions to verify the expected behavior
        assertNotNull(savedSubject);
        assertEquals("Math", savedSubject.getSubjectName());

        // Verifying that the mocked methods were called with the expected parameters
        verify(schoolInformationRepository).findById(any(Long.class));
        verify(subjectRepository).save(any(Subject.class));
    }


    @Test
    void testFindById() {
        Long subjectId = 1L;
        Subject subject = Subject.builder()
                .subjectId(subjectId)
                .subjectName("Math")
                .grade("10")
                .year("2024")
                .semester("1")
                .regDate(LocalDateTime.now())
                .build();

        when(subjectRepository.findById(subjectId)).thenReturn(Optional.of(subject));

        SubjectInfoDTO subjectInfoDTO = subjectService.findById(subjectId);

        assertNotNull(subjectInfoDTO);
        assertEquals("Math", subjectInfoDTO.getSubjectName());

        verify(subjectRepository).findById(subjectId);
    }

    @Test
    void testDeleteById() {
        Long subjectId = 1L;
        subjectService.deleteById(subjectId);
        verify(subjectRepository).deleteById(subjectId);
    }
    @Test
    void testFindSubjectsByGradeAndYear() {
        User user = mock(User.class);
        SchoolInformation schoolInformation = new SchoolInformation();
        when(user.getSchoolInformation()).thenReturn(schoolInformation);

        Subject subject = Subject.builder()
                .subjectId(1L)
                .subjectName("Math")
                .grade("10")
                .year("2024")
                .semester("1")
                .regDate(LocalDateTime.now())
                .schoolInformation(schoolInformation)
                .build();

        when(subjectRepository.findBySchoolAndGradeAndYear(schoolInformation, "10", "2024")).thenReturn(List.of(subject));

        List<SubjectInfoDTO> subjects = subjectService.findSubjectsByGradeAndYear("10", "2024", user);

        assertNotNull(subjects);
        assertEquals(1, subjects.size());
        assertEquals("Math", subjects.get(0).getSubjectName());

        verify(subjectRepository).findBySchoolAndGradeAndYear(schoolInformation, "10", "2024");
    }


}
