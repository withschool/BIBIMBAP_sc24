package com.withSchool.service.school;

import com.withSchool.dto.school.SchoolInformationDTO;
import com.withSchool.dto.school.SchoolInformationListDTO;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.user.UserRepository;
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

public class SchoolInformationServiceTest {

    @Mock
    private SchoolInformationRepository schoolInformationRepository;
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private SchoolInformationService schoolInformationService;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        // given
        SchoolInformation schoolInformation = SchoolInformation.builder()
                .schoolId(1L)
                .schulNm("Test School")
                .orgRdnma("Test Address")
                .orgTelno("123-456-7890")
                .juOrgNm("Test Organization")
                .sdSchulCode("1234")
                .regDate(LocalDateTime.now())
                .build();

        when(schoolInformationRepository.findAll()).thenReturn(List.of(schoolInformation));

        // when
        List<SchoolInformationListDTO> result = schoolInformationService.findAll();

        // then
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("Test School", result.get(0).getSchoolName());
    }

    @Test
    public void testFindById() {
        // given
        Long schoolId = 1L;
        SchoolInformation schoolInformation = SchoolInformation.builder()
                .schoolId(schoolId)
                .schulNm("Test School")
                .orgRdnma("Test Address")
                .orgTelno("123-456-7890")
                .juOrgNm("Test Organization")
                .sdSchulCode("1234")
                .regDate(LocalDateTime.now())
                .build();

        when(schoolInformationRepository.findById(schoolId)).thenReturn(Optional.of(schoolInformation));

        // when
        SchoolInformationDTO result = schoolInformationService.findById(schoolId);

        // then
        assertNotNull(result);
        assertEquals("Test School", result.getSCHUL_NM());
        assertEquals("Test Address", result.getORG_RDNMA());
    }

    @Test
    public void testIsDuplicateSchool() {
        // given
        String AtptOfcdcScCode = "A123";
        String SdSchulCode = "S123";
        SchoolInformation schoolInformation = new SchoolInformation();
        schoolInformation.setAtptOfcdcScCode(AtptOfcdcScCode);
        schoolInformation.setSdSchulCode(SdSchulCode);

        when(schoolInformationRepository.findByAtptOfcdcScCodeAndSdSchulCode(AtptOfcdcScCode, SdSchulCode)).thenReturn(Optional.of(schoolInformation));

        // when
        boolean result = schoolInformationService.isDuplicateSchool(AtptOfcdcScCode, SdSchulCode);

        // then
        assertTrue(result);
    }

    @Test
    public void testSave() {
        // given
        SchoolInformation schoolInformation = SchoolInformation.builder()
                .atptOfcdcScCode("A123")
                .sdSchulCode("S123")
                .schulNm("Test School")
                .build();

        when(schoolInformationRepository.save(any(SchoolInformation.class))).thenReturn(schoolInformation);
        when(schoolInformationRepository.findByAtptOfcdcScCodeAndSdSchulCode(any(), any())).thenReturn(Optional.empty());

        // when
        SchoolInformation result = schoolInformationService.save(schoolInformation);

        // then
        assertNotNull(result);
        assertEquals("Test School", result.getSchulNm());
    }

    @Test
    public void testSave_DuplicateSchool() {
        // given
        SchoolInformation schoolInformation = SchoolInformation.builder()
                .atptOfcdcScCode("A123")
                .sdSchulCode("S123")
                .schulNm("Test School")
                .build();

        when(schoolInformationRepository.findByAtptOfcdcScCodeAndSdSchulCode(any(), any())).thenReturn(Optional.of(schoolInformation));

        // when
        SchoolInformation result = schoolInformationService.save(schoolInformation);

        // then
        assertNull(result);
    }

    @Test
    public void testDelete() {
        // given
        Long schoolId = 1L;

        // when
        schoolInformationService.delete(schoolId);

        // then
        verify(userRepository, times(1)).deleteAllUsersBySchoolId(schoolId);
        verify(schoolInformationRepository, times(1)).deleteById(schoolId);
    }
}
