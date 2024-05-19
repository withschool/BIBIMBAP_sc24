package com.withSchool.feat.feat_17;

import com.amazonaws.services.s3.AmazonS3;
import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.school.SchoolNoticeDTO;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.entity.school.SchoolNoticeFile;
import com.withSchool.entity.user.User;
import com.withSchool.repository.file.SchoolNoticeFileRepository;
import com.withSchool.repository.school.SchoolNoticeRepository;
import com.withSchool.service.file.FileService;
import com.withSchool.service.school.SchoolNoticeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SchoolNoticeServiceTest {

    @InjectMocks
    private FileService fileService;
    @InjectMocks
    private SchoolNoticeService schoolNoticeService;
    @Mock
    private FileService mockfileService;
    @Mock
    private SchoolNoticeFileRepository schoolNoticeFileRepository;
    @Mock
    private SchoolNoticeRepository schoolNoticeRepository;
    @Mock
    private AmazonS3 amazonS3;
    SchoolNotice schoolNotice = SchoolNotice.builder()
            .schoolNoticeId(22L)
            .title("실험제목")
            .content("실험내용")
            .build();
    MockMultipartFile mockMultipartFile = new MockMultipartFile(
            "file",
            "test.txt",
            "text/plain",
            "Hello, World!".getBytes());
    FileDTO fileDTO = FileDTO.builder()
                .file(mockMultipartFile)
                .repoType("schoolNotice")
                .masterId(12L)
                .build();

    User user = User.builder()
            .userId(12L)
            .userCode("userCode")
            .accountType(3)
            .build();

    SchoolInformation schoolInformation = SchoolInformation.builder()
            .schoolId(13L)
            .build();

    @DisplayName("공지사항 파일 저장 로직")
    @Test
    public void 학교_공지사항_파일_저장로직(){
        //given
        when(schoolNoticeRepository.findById(anyLong())).thenReturn(Optional.of(schoolNotice));

        //when
        fileService.saveFile(fileDTO);

        //then
        ArgumentCaptor<SchoolNoticeFile> captor = ArgumentCaptor.forClass(SchoolNoticeFile.class);
        verify(schoolNoticeFileRepository).save(captor.capture());
        SchoolNoticeFile captured = captor.getValue();

        assertEquals("test.txt", captured.getOriginalName());
        assertNotNull(captured.getFileUrl());
        assertEquals(schoolNotice.getSchoolNoticeId(), captured.getSchoolNotice().getSchoolNoticeId());
    }
    @DisplayName("공지사항 전체 내용 저장 로직")
    @Test
    public void 학교_공지사항_전체_내용_저장_로직(){
        //given
        List<MultipartFile> files = new ArrayList<>();
        files.add(mockMultipartFile);
        SchoolNoticeDTO schoolNoticeDTO = SchoolNoticeDTO.builder()
                .title("실험제목")
                .content("실험내용")
                .user(user)
                .school(schoolInformation)
                .file(files)
                .build();
        when(schoolNoticeRepository.save(any())).thenReturn(schoolNotice);

        //when
        schoolNoticeService.save(schoolNoticeDTO);

        //then
        ArgumentCaptor<SchoolNotice> captor = ArgumentCaptor.forClass(SchoolNotice.class);
        verify(schoolNoticeRepository).save(captor.capture());
        SchoolNotice captured = captor.getValue();

        assertEquals("실험제목", captured.getTitle());
        assertEquals("실험내용", captured.getContent());

        assertEquals(12L, captured.getUser().getUserId());
        assertEquals("userCode", captured.getUser().getUserCode());

        assertEquals(3, captured.getUser().getAccountType());
        assertEquals(13L, captured.getSchoolInformation().getSchoolId());

        ArgumentCaptor<FileDTO> captor2 = ArgumentCaptor.forClass(FileDTO.class);
        verify(mockfileService).saveFile(captor2.capture());
        FileDTO captured2 = captor2.getValue();

        assertEquals("schoolNotice", captured2.getRepoType());
        assertEquals(22L,captured2.getMasterId());
        assertNotNull(captured2.getFile());
    }

}
