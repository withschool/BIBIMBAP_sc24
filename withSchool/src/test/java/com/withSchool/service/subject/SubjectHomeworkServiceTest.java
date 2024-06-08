package com.withSchool.service.subject;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.subject.ReqHomeworkCreateDTO;
import com.withSchool.dto.subject.ReqHomeworkSubmitDTO;
import com.withSchool.dto.subject.ResHomeworkDTO;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.subject.SubjectHomework;
import com.withSchool.entity.subject.SubjectHomeworkFile;
import com.withSchool.entity.subject.SubjectHomeworkSubmit;
import com.withSchool.entity.subject.SubjectHomeworkSubmitFile;
import com.withSchool.entity.user.User;
import com.withSchool.repository.file.SubjectHomeworkFileRepository;
import com.withSchool.repository.file.SubjectHomeworkSubmitFileRepository;
import com.withSchool.repository.subject.SubjectHomeworkRepository;
import com.withSchool.repository.subject.SubjectHomeworkSubmitRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.service.file.FileService;
import com.withSchool.service.mapping.StudentSubjectService;
import com.withSchool.service.user.NotificationService;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class SubjectHomeworkServiceTest {

    @Mock
    private SubjectHomeworkRepository subjectHomeworkRepository;

    @Mock
    private SubjectHomeworkSubmitRepository subjectHomeworkSubmitRepository;

    @Mock
    private SubjectHomeworkFileRepository subjectHomeworkFileRepository;

    @Mock
    private SubjectHomeworkSubmitFileRepository subjectHomeworkSubmitFileRepository;

    @Mock
    private SubjectRepository subjectRepository;

    @Mock
    private StudentSubjectService studentSubjectService;

    @Mock
    private FileService fileService;

    @Mock
    private UserService userService;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private SubjectHomeworkService subjectHomeworkService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveHomework() {
        ReqHomeworkCreateDTO reqDTO = new ReqHomeworkCreateDTO();
        reqDTO.setId(1L);
        reqDTO.setTitle("Homework Title");
        reqDTO.setContent("Homework Content");
        reqDTO.setDue(LocalDateTime.now());
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        reqDTO.setFiles(Arrays.asList(file));

        Subject subject = Subject.builder()
                .subjectId(1L)
                .build();
        when(subjectRepository.findById(1L)).thenReturn(Optional.of(subject));

        SubjectHomework subjectHomework = SubjectHomework.builder()
                .subjectHomeworkId(1L)
                .subjectHomeworkTitle(reqDTO.getTitle())
                .subjectHomeworkContent(reqDTO.getContent())
                .SubjectHomeworkDue(reqDTO.getDue())
                .subject(subject)
                .build();
        when(subjectHomeworkRepository.save(any(SubjectHomework.class))).thenReturn(subjectHomework);

        List<User> userList = Arrays.asList(mock(User.class));
        when(studentSubjectService.findSugangStudent(1L)).thenReturn(userList);

        ResHomeworkDTO resDTO = subjectHomeworkService.save(reqDTO);

        assertNotNull(resDTO);
        assertEquals("Homework Title", resDTO.getTitle());
        verify(fileService).saveFile(any(FileDTO.class));
        verify(notificationService).sendSMSGroup(eq(userList), anyString(), eq("Homework Title"), eq(true));
    }

    @Test
    public void testUpdateHomework() {
        Long homeworkId = 1L;
        ReqHomeworkCreateDTO reqDTO = new ReqHomeworkCreateDTO();
        reqDTO.setTitle("Updated Homework Title");
        reqDTO.setContent("Updated Homework Content");
        reqDTO.setDue(LocalDateTime.now());
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        reqDTO.setFiles(Arrays.asList(file));

        // 목 객체 설정
        SubjectHomeworkFile file1 = new SubjectHomeworkFile();
        file1.setSavedName("file1.jpg");

        List<SubjectHomeworkFile> fileList = Arrays.asList(file1);
        when(subjectHomeworkFileRepository.findBySubjectHomeworkId(homeworkId)).thenReturn(Optional.of(fileList));


        Subject subject = Subject.builder()
                .subjectId(1L)
                .build();
        SubjectHomework originalHomework = SubjectHomework.builder()
                .subjectHomeworkId(homeworkId)
                .subjectHomeworkTitle("Old Homework Title")
                .subjectHomeworkContent("Old Homework Content")
                .SubjectHomeworkDue(LocalDateTime.now().minusDays(1))
                .subject(subject)
                .build();
        when(subjectHomeworkRepository.findById(homeworkId)).thenReturn(Optional.of(originalHomework));

        SubjectHomework updatedHomework = SubjectHomework.builder()
                .subjectHomeworkId(homeworkId)
                .subjectHomeworkTitle(reqDTO.getTitle())
                .subjectHomeworkContent(reqDTO.getContent())
                .SubjectHomeworkDue(reqDTO.getDue())
                .subject(subject)
                .build();
        when(subjectHomeworkRepository.save(any(SubjectHomework.class))).thenReturn(updatedHomework);

        ResHomeworkDTO resDTO = subjectHomeworkService.update(homeworkId, reqDTO);

        assertNotNull(resDTO);
        assertEquals("Updated Homework Title", resDTO.getTitle());
        verify(fileService).deleteFile(any(FileDeleteDTO.class));
        verify(fileService).saveFile(any(FileDTO.class));
    }

    @Test
    public void testDeleteHomework() {
        Long homeworkId = 1L;

        // 목 객체 설정
        SubjectHomeworkFile file1 = new SubjectHomeworkFile();
        file1.setSavedName("file1.jpg");

        List<SubjectHomeworkFile> fileList = Arrays.asList(file1);
        when(subjectHomeworkFileRepository.findBySubjectHomeworkId(homeworkId)).thenReturn(Optional.of(fileList));

        subjectHomeworkService.delete(homeworkId);

        verify(fileService, times(1)).deleteFile(any(FileDeleteDTO.class));
        verify(subjectHomeworkRepository).deleteById(homeworkId);
    }

    @Test
    public void testSubmitHomework() throws Exception {
        ReqHomeworkSubmitDTO reqDTO = new ReqHomeworkSubmitDTO();
        reqDTO.setHomeworkId(1L);
        reqDTO.setContent("Submitted Homework Content");
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        reqDTO.setFiles(Arrays.asList(file));

        User student = User.builder()
                .userId(1L)
                .id("student1")
                .name("Student 1")
                .build();
        when(userService.getCurrentUser()).thenReturn(student);

        SubjectHomework subjectHomework = SubjectHomework.builder()
                .subjectHomeworkId(1L)
                .subjectHomeworkTitle("Homework Title")
                .subjectHomeworkContent("Homework Content")
                .SubjectHomeworkDue(LocalDateTime.now().plusDays(1))
                .subject(Subject.builder().subjectId(1L).build())
                .build();
        when(subjectHomeworkRepository.findById(1L)).thenReturn(Optional.of(subjectHomework));

        SubjectHomeworkSubmit subjectHomeworkSubmit = SubjectHomeworkSubmit.builder()
                .subjectHomeworkSubmitId(1L)
                .subjectSubmitContent(reqDTO.getContent())
                .subjectHomework(subjectHomework)
                .user(student)
                .build();
        when(subjectHomeworkSubmitRepository.save(any(SubjectHomeworkSubmit.class))).thenReturn(subjectHomeworkSubmit);

        String result = subjectHomeworkService.submit(reqDTO);

        assertEquals("Homework submitted successfully.", result);
        verify(fileService).saveFile(any(FileDTO.class));
    }

    @Test
    public void testUpdateSubmit() throws Exception {
        Long submitId = 1L;
        ReqHomeworkSubmitDTO reqDTO = new ReqHomeworkSubmitDTO();
        reqDTO.setContent("Updated Submit Content");
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        reqDTO.setFiles(Arrays.asList(file));

        // Mock file list
        SubjectHomeworkSubmitFile file1 = new SubjectHomeworkSubmitFile();
        file1.setSavedName("file1.jpg");

        List<SubjectHomeworkSubmitFile> fileList = Arrays.asList(file1);
        when(subjectHomeworkSubmitFileRepository.findBySubjectHomeworkSubmitId(submitId)).thenReturn(Optional.of(fileList));

        // Mock current user
        User student = User.builder()
                .userId(1L)
                .id("student1")
                .name("Student 1")
                .build();
        when(userService.getCurrentUser()).thenReturn(student);

        // Mock original submission
        SubjectHomeworkSubmit originalSubmit = SubjectHomeworkSubmit.builder()
                .subjectHomeworkSubmitId(submitId)
                .subjectSubmitContent("Old Submit Content")
                .subjectHomework(SubjectHomework.builder().subjectHomeworkId(1L).build())
                .user(student)
                .build();
        when(subjectHomeworkSubmitRepository.findById(submitId)).thenReturn(Optional.of(originalSubmit));

        // Mock updated submission
        SubjectHomeworkSubmit updatedSubmit = SubjectHomeworkSubmit.builder()
                .subjectHomeworkSubmitId(submitId)
                .subjectSubmitContent(reqDTO.getContent())
                .subjectHomework(originalSubmit.getSubjectHomework())
                .user(student)
                .build();
        when(subjectHomeworkSubmitRepository.save(any(SubjectHomeworkSubmit.class))).thenReturn(updatedSubmit);

        // Call service method
        String result = subjectHomeworkService.updateSubmit(submitId, reqDTO);

        // Verify result
        assertEquals("Homework update successfully.", result);

        // Verify interactions
        verify(fileService, times(1)).deleteFile(any(FileDeleteDTO.class));
        verify(fileService, times(1)).saveFile(any(FileDTO.class));
    }

}
