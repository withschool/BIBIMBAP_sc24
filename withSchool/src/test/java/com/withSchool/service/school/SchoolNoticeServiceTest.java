package com.withSchool.service.school;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.school.ReqNoticeDTO;
import com.withSchool.dto.school.ResNoticeDTO;
import com.withSchool.dto.user.ResUserDefaultDTO;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.entity.school.SchoolNoticeFile;
import com.withSchool.entity.user.User;
import com.withSchool.repository.file.SchoolNoticeFileRepository;
import com.withSchool.repository.school.SchoolNoticeRepository;
import com.withSchool.service.file.FileService;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class SchoolNoticeServiceTest {

    @Mock
    private SchoolNoticeRepository schoolNoticeRepository;

    @Mock
    private SchoolNoticeFileRepository schoolNoticeFileRepository;

    @Mock
    private FileService fileService;

    @Mock
    private UserService userService;

    @InjectMocks
    private SchoolNoticeService schoolNoticeService;

    @Mock
    private Authentication authentication;

    @Mock
    private SecurityContext securityContext;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    public void testSave() {
        // given
        ReqNoticeDTO reqNoticeDTO = ReqNoticeDTO.builder()
                .title("Test Title")
                .content("Test Content")
                .file(Arrays.asList(mock(MultipartFile.class)))
                .build();

        User admin = new User();
        admin.setId("admin");
        admin.setName("Admin Name");

        SchoolNotice savedNotice = SchoolNotice.builder()
                .schoolNoticeId(1L)
                .title("Test Title")
                .content("Test Content")
                .user(admin)
                .regDate(LocalDateTime.now())
                .build();

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("admin");
        when(userService.findById("admin")).thenReturn(admin);
        when(schoolNoticeRepository.save(any(SchoolNotice.class))).thenReturn(savedNotice);

        // when
        ResNoticeDTO result = schoolNoticeService.save(reqNoticeDTO);

        // then
        assertNotNull(result);
        assertEquals("Test Title", result.getTitle());
        assertEquals("Test Content", result.getContent());
        assertEquals("Admin Name", result.getUser().getName());
        verify(fileService, times(1)).saveFile(any(FileDTO.class));
    }

    @Test
    public void testFindById() {
        // given
        Long schoolNoticeId = 1L;
        User user = new User();
        user.setId("user");
        user.setName("User Name");

        SchoolNotice schoolNotice = SchoolNotice.builder()
                .schoolNoticeId(schoolNoticeId)
                .title("Test Title")
                .content("Test Content")
                .user(user)
                .regDate(LocalDateTime.now())
                .build();

        SchoolNoticeFile schoolNoticeFile = new SchoolNoticeFile();
        schoolNoticeFile.setFileUrl("testUrl");
        schoolNoticeFile.setOriginalName("testOriginalName");

        when(schoolNoticeRepository.findById(schoolNoticeId)).thenReturn(Optional.of(schoolNotice));
        when(schoolNoticeFileRepository.findBySchoolNoticeId(schoolNoticeId)).thenReturn(Optional.of(List.of(schoolNoticeFile)));

        // when
        ResNoticeDTO result = schoolNoticeService.findById(schoolNoticeId);

        // then
        assertNotNull(result);
        assertEquals("Test Title", result.getTitle());
        assertEquals("Test Content", result.getContent());
        assertEquals("User Name", result.getUser().getName());
        assertEquals(List.of("testUrl"), result.getFilesURl());
        assertEquals(List.of("testOriginalName"), result.getOriginalName());
    }

    @Test
    public void testFindAll() {
        // given
        User user = new User();
        user.setId("user");
        user.setName("User Name");
        user.setAccountType(0);
        user.setSchoolInformation(new SchoolInformation());
        user.getSchoolInformation().setSchoolId(1L);

        SchoolNotice schoolNotice = SchoolNotice.builder()
                .schoolNoticeId(1L)
                .title("Test Title")
                .content("Test Content")
                .user(user)
                .regDate(LocalDateTime.now())
                .build();

        when(userService.getCurrentUser()).thenReturn(user);
        when(schoolNoticeRepository.findAllBySchoolId(1L)).thenReturn(List.of(schoolNotice));

        // when
        List<ResNoticeDTO> result = schoolNoticeService.findAll(null);

        // then
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("Test Title", result.get(0).getTitle());
    }

    @Test
    public void testUpdateById() {
        // given
        Long schoolNoticeId = 1L;
        ReqNoticeDTO reqNoticeDTO = ReqNoticeDTO.builder()
                .title("Updated Title")
                .content("Updated Content")
                .file(Arrays.asList(mock(MultipartFile.class)))
                .build();

        User user = new User();
        user.setId("user");
        user.setName("User Name");

        SchoolNotice existingNotice = SchoolNotice.builder()
                .schoolNoticeId(schoolNoticeId)
                .title("Test Title")
                .content("Test Content")
                .user(user)
                .build();
        SchoolNotice updateNotice = SchoolNotice.builder()
                .schoolNoticeId(schoolNoticeId)
                .title("Updated Title")
                .content("Updated Content")
                .user(user)
                .build();

        when(schoolNoticeRepository.findById(schoolNoticeId)).thenReturn(Optional.of(existingNotice));
        when(schoolNoticeRepository.save(any(SchoolNotice.class))).thenReturn(updateNotice);

        // when
        SchoolNotice result = schoolNoticeService.updateById(schoolNoticeId, reqNoticeDTO);

        // then
        assertNotNull(result);
        assertEquals("Updated Title", result.getTitle());
        assertEquals("Updated Content", result.getContent());
        verify(fileService, times(1)).saveFile(any(FileDTO.class));
    }

    @Test
    public void testDeleteById() {
        // given
        Long schoolNoticeId = 1L;
        SchoolNoticeFile schoolNoticeFile = new SchoolNoticeFile();
        schoolNoticeFile.setSavedName("testFile");

        when(schoolNoticeFileRepository.findBySchoolNoticeId(schoolNoticeId)).thenReturn(Optional.of(List.of(schoolNoticeFile)));

        // when
        schoolNoticeService.deleteById(schoolNoticeId);

        // then
        verify(fileService, times(1)).deleteFile(any());
        verify(schoolNoticeRepository, times(1)).deleteById(schoolNoticeId);
    }
}
