package com.withSchool.service.subject;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.school.ReqNoticeDTO;
import com.withSchool.dto.school.ResNoticeDTO;
import com.withSchool.dto.subject.ReqSubjectNoticeDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.subject.SubjectNotice;
import com.withSchool.entity.subject.SubjectNoticeFile;
import com.withSchool.entity.user.User;
import com.withSchool.repository.file.SubjectNoticeFileRepository;
import com.withSchool.repository.mapping.TeacherSubjectRepository;
import com.withSchool.repository.subject.SubjectNoticeRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.service.file.FileService;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SubjectNoticeServiceTest {
    @InjectMocks
    private SubjectNoticeService subjectNoticeService;
    @Mock private UserService userService;
    @Mock private FileService fileService;
    @Mock private SubjectNoticeRepository subjectNoticeRepository;
    @Mock private SubjectNoticeFileRepository subjectNoticeFileRepository;
    @Mock private TeacherSubjectRepository teacherSubjectRepository;
    @Mock private SubjectRepository subjectRepository;

    SchoolInformation schoolInformation = SchoolInformation.builder().schoolId(1L).atptOfcdcScCode("T10").atptOfcdcScNm("제주특별자치도교육청").sdSchulCode("9299048").schulNm("가마초등학교").engSchulNm("GAMA ELEMENTARY SCHOOL").schulKndScNm("초등학교").lctnScNm("제주특별자치도").juOrgNm("서귀포시교육지원청").fondScNm("공립").orgRdnzc("63625").orgRdnma("제주특별자치도 서귀포시 표선면 일주동로6285번길 8").orgRdnda("/ 가마초등학교 (표선면)").orgTelno("064-780-9500").hmpgAdres("http://gama.jje.es.kr").coeduScNm("남여공학").orgFaxno("064-780-9580").hsScNm("").indstSpeclCccclExstYn("N").hsGnrlBusnsScNm("해당없음").spclyPurpsHsOrdNm("").eneBfeSehfScNm("전기").dghtScNm("주간").fondYmd("19680301").foasMemrd("19730316").loadDtm("20230615").build();
    Subject subject = Subject.builder().subjectId(1L).subjectName("수학").grade("1").year("2024").year("2024").semester("1").regDate(LocalDateTime.now()).schoolInformation(schoolInformation).build();
    ClassInformation classInfo = ClassInformation.builder().grade(1).inClass(2).year(2024).classId(1L).modDate(null).regDate(LocalDateTime.now()).schoolInformation(schoolInformation).build();
    User student = User.builder().userId(18L).id("id1").password("$2a$10$ObJRKLgEVLam.jWp.qssiuYlQ4Nq.mY8pZw8It3Ae6spt45Hiy0sm").email("newemail@ajou.ac.kr").name("황근출1").sex(false).phoneNumber("01012345678").address("new address").birthDate(null).accountType(0).userCode("asdas12as1").schoolInformation(schoolInformation).classInformation(classInfo).build();
    User teacher = User.builder().userId(19L).id("id2").password("$2a$10$ObJRKLgEVLam.jWp.qssiuYlQ4Nq.mY8pZw8It3Ae6spt45Hiy0sm").email("newemail@ajou.ac.kr").name("황근출1").sex(false).phoneNumber("01012345678").address("new address").birthDate(null).accountType(2).userCode("asdas12as1").schoolInformation(schoolInformation).classInformation(classInfo).build();
    User admin = User.builder().userId(19L).id("id2").password("$2a$10$ObJRKLgEVLam.jWp.qssiuYlQ4Nq.mY8pZw8It3Ae6spt45Hiy0sm").email("newemail@ajou.ac.kr").name("황근출1").sex(false).phoneNumber("01012345678").address("new address").birthDate(null).accountType(4).userCode("asdas12as1").schoolInformation(schoolInformation).classInformation(classInfo).build();

    SubjectNotice subjectNotice = SubjectNotice.builder()
            .subject(subject)
            .title("title")
            .content("content")
            .subjectNoticeId(1L)
            .build();

    @Test
    @DisplayName("과목교사의 과목 공지 작성")
    void testSave() {
        // given
        when(userService.getCurrentUser()).thenReturn(teacher);
        when(subjectRepository.findById(anyLong())).thenReturn(Optional.of(subject));
        when(subjectNoticeRepository.save(any(SubjectNotice.class))).thenReturn(subjectNotice);

        // when
        ResNoticeDTO resNoticeDTO = subjectNoticeService.save(ReqSubjectNoticeDTO.builder()
                .subjectId(1L)
                .title("Test Title")
                .content("Test Content")
                .file(Arrays.asList(mock(MultipartFile.class)))
                .build());

        // then
        assertEquals(subjectNotice.getTitle(), resNoticeDTO.getTitle());
        verify(fileService, times(1)).saveFile(any(FileDTO.class));
    }

    @Test
    @DisplayName("과목교사의 과목 공지 수정 성공")
    public void testUpdateById_Success() {
        // given
        Long noticeId = 1L;
        User teacher = new User();
        teacher.setUserId(1L);
        teacher.setId("teacher1");
        teacher.setName("Teacher Name");

        ReqNoticeDTO reqNoticeDTO = new ReqNoticeDTO();
        reqNoticeDTO.setTitle("Updated Title");
        reqNoticeDTO.setContent("Updated Content");
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        reqNoticeDTO.setFile(Arrays.asList(file));

        SubjectNotice existingNotice = new SubjectNotice();
        existingNotice.setSubjectNoticeId(noticeId);
        existingNotice.setSubject(new Subject());

        SubjectNotice savedNotice = SubjectNotice.builder()
                .subjectNoticeId(noticeId)
                .title("Updated Title")
                .content("Updated Content")
                .user(teacher)
                .subject(existingNotice.getSubject())
                .build();

        List<SubjectNoticeFile> existingFiles = Arrays.asList(new SubjectNoticeFile());

        when(userService.getCurrentUser()).thenReturn(teacher);
        when(subjectNoticeRepository.findById(noticeId)).thenReturn(Optional.of(existingNotice));
        when(subjectNoticeRepository.save(any(SubjectNotice.class))).thenReturn(savedNotice);
        when(subjectNoticeFileRepository.findBySubjectNoticeId(noticeId)).thenReturn(Optional.of(existingFiles));

        // when
        ResNoticeDTO result = subjectNoticeService.updateById(noticeId, reqNoticeDTO);

        // then
        assertNotNull(result);
        assertEquals("Updated Title", result.getTitle());
        assertEquals("Updated Content", result.getContent());
        assertEquals(teacher.getUserId(), result.getUser().getUserId());

        verify(subjectNoticeRepository).save(any(SubjectNotice.class));
        verify(fileService).saveFile(any(FileDTO.class));
        verify(fileService, times(existingFiles.size())).deleteFile(any(FileDeleteDTO.class));
    }

    @Test
    @DisplayName("과목교사의 과목 공지 수정 실패")
    public void testUpdateById_NoticeNotFound() {
        // given
        Long noticeId = 1L;
        ReqNoticeDTO reqNoticeDTO = new ReqNoticeDTO();
        reqNoticeDTO.setTitle("Updated Title");
        reqNoticeDTO.setContent("Updated Content");

        when(subjectNoticeRepository.findById(noticeId)).thenReturn(Optional.empty());

        // when
        ResNoticeDTO result = subjectNoticeService.updateById(noticeId, reqNoticeDTO);

        // then
        assertNull(result);

        verify(subjectNoticeRepository, never()).save(any(SubjectNotice.class));
        verify(fileService, never()).saveFile(any(FileDTO.class));
        verify(fileService, never()).deleteFile(any(FileDeleteDTO.class));
    }
}
