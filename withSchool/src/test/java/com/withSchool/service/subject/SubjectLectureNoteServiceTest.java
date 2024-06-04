package com.withSchool.service.subject;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.subject.ReqSubjectLectureNoteDTO;
import com.withSchool.dto.subject.ResSubjectLectureNoteDTO;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.subject.SubjectLectureNote;
import com.withSchool.entity.subject.SubjectLectureNoteFile;
import com.withSchool.entity.user.User;
import com.withSchool.repository.file.SubjectLectureNoteFileRepository;
import com.withSchool.repository.mapping.StudentSubjectRepository;
import com.withSchool.repository.subject.SubjectLectureNoteRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.service.file.FileService;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class SubjectLectureNoteServiceTest  {

    @Mock
    private SubjectLectureNoteRepository subjectLectureNoteRepository;

    @Mock
    private SubjectLectureNoteFileRepository subjectLectureNoteFileRepository;

    @Mock
    private SubjectRepository subjectRepository;

    @Mock
    private FileService fileService;

    @Mock
    private UserService userService;

    @Mock
    private StudentSubjectRepository studentSubjectRepository;

    @InjectMocks
    private SubjectLectureNoteService subjectLectureNoteService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllSubjectLectureNotes() {
        User user = User.builder()
                .userId(1L)
                .id("testUser")
                .name("Test User")
                .build();

        Subject subject = Subject.builder()
                .subjectId(1L)
                .build();

        SubjectLectureNote lectureNote = SubjectLectureNote.builder()
                .subjectLectureNoteId(1L)
                .title("Lecture Note 1")
                .subject(subject)
                .user(user)
                .build();

        List<SubjectLectureNote> lectureNotes = Arrays.asList(lectureNote);

        when(userService.getCurrentUser()).thenReturn(user);
        when(studentSubjectRepository.findSubjectsByUser(user)).thenReturn(Arrays.asList(subject));
        when(subjectLectureNoteRepository.findBySubject(subject)).thenReturn(Optional.of(lectureNotes));

        List<ResSubjectLectureNoteDTO> result = subjectLectureNoteService.getAllSubjectLectureNotes();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Lecture Note 1", result.get(0).getTitle());
    }

    @Test
    public void testCreateSubjectLectureNote() {
        Long subjectId = 1L;
        Subject subject = Subject.builder()
                .subjectId(subjectId)
                .build();

        User user = User.builder()
                .userId(1L)
                .id("testUser")
                .name("Test User")
                .build();

        ReqSubjectLectureNoteDTO reqDTO = ReqSubjectLectureNoteDTO.builder().build();

        reqDTO.setSubjectId(subjectId);
        reqDTO.setTitle("New Lecture Note");

        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        reqDTO.setFile(Arrays.asList(file));

        SubjectLectureNote savedLectureNote = SubjectLectureNote.builder()
                .subjectLectureNoteId(1L)
                .title("New Lecture Note")
                .subject(subject)
                .user(user)
                .build();

        when(subjectRepository.findById(subjectId)).thenReturn(Optional.of(subject));
        when(userService.getCurrentUser()).thenReturn(user);
        when(subjectLectureNoteRepository.save(any(SubjectLectureNote.class))).thenReturn(savedLectureNote);

        ResSubjectLectureNoteDTO result = subjectLectureNoteService.createSubjectLectureNote(reqDTO);

        assertNotNull(result);
        assertEquals("New Lecture Note", result.getTitle());
        assertEquals(user.getUserId(), result.getUser().getUserId());

        verify(subjectLectureNoteRepository).save(any(SubjectLectureNote.class));
        verify(fileService).saveFile(any(FileDTO.class));
    }
    @Test
    public void testUpdateLectureNote() {
        Long lectureNoteId = 1L;
        Long subjectId = 1L;

        Subject subject = Subject.builder()
                .subjectId(subjectId)
                .build();

        User user = User.builder()
                .userId(1L)
                .id("testUser")
                .name("Test User")
                .build();

        SubjectLectureNote existingLectureNote = SubjectLectureNote.builder()
                .subjectLectureNoteId(lectureNoteId)
                .title("Old Title")
                .subject(subject)
                .user(user)
                .build();

        ReqSubjectLectureNoteDTO reqDTO = ReqSubjectLectureNoteDTO.builder().build();

        reqDTO.setSubjectId(subjectId);
        reqDTO.setTitle("Updated Title");

        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        reqDTO.setFile(Arrays.asList(file));

        when(subjectLectureNoteRepository.findById(lectureNoteId)).thenReturn(Optional.of(existingLectureNote));
        when(subjectRepository.findById(subjectId)).thenReturn(Optional.of(subject));
        when(subjectLectureNoteRepository.save(existingLectureNote)).thenReturn(existingLectureNote);

        List<SubjectLectureNoteFile> mockFiles = Arrays.asList(
                SubjectLectureNoteFile.builder()
                        .savedName("testFile")
                        .build()
        );

        when(subjectLectureNoteFileRepository.findBySubjectLectureNote_SubjectLectureNoteId(lectureNoteId)).thenReturn(Optional.of(mockFiles));

        ResSubjectLectureNoteDTO result = subjectLectureNoteService.updateLectureNote(lectureNoteId, reqDTO);

        assertNotNull(result);
        assertEquals("Updated Title", result.getTitle());

        verify(subjectLectureNoteRepository).save(existingLectureNote);
        verify(fileService).saveFile(any(FileDTO.class));
        verify(fileService, times(1)).deleteSubjectLectureNoteFile(any(FileDeleteDTO.class));
    }

    @Test
    public void testDeleteLectureNote() {
        Long lectureNoteId = 1L;

        SubjectLectureNote lectureNote = SubjectLectureNote.builder()
                .subjectLectureNoteId(lectureNoteId)
                .build();

        when(subjectLectureNoteRepository.findById(lectureNoteId)).thenReturn(Optional.of(lectureNote));
        List<SubjectLectureNoteFile> mockFiles = Arrays.asList(
                SubjectLectureNoteFile.builder()
                        .savedName("testFile")
                        .build()
        );

        when(subjectLectureNoteFileRepository.findBySubjectLectureNote_SubjectLectureNoteId(lectureNoteId)).thenReturn(Optional.of(mockFiles));

        subjectLectureNoteService.deleteLectureNote(lectureNoteId);

        verify(fileService, times(1)).deleteSubjectLectureNoteFile(any(FileDeleteDTO.class));
        verify(subjectLectureNoteRepository).delete(lectureNote);
    }
}