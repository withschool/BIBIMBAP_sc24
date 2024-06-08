package com.withSchool.service.school;

import com.withSchool.dto.school.ReqApplicationDefaultDTO;
import com.withSchool.dto.school.ResApplicationDefaultDTO;
import com.withSchool.entity.school.SchoolApplication;
import com.withSchool.repository.school.SchoolApplicationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class SchoolApplicationServiceTest {

    @Mock
    private SchoolApplicationRepository schoolApplicationRepository;

    @InjectMocks
    private SchoolApplicationService schoolApplicationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSave() {
        // given
        ReqApplicationDefaultDTO request = ReqApplicationDefaultDTO.builder()
                .schoolAdminName("admin")
                .schoolAdminEmail("test@example.com")
                .schoolName("Test School")
                .schoolPhoneNumber("123-456-7890")
                .build();

        SchoolApplication savedApplication = SchoolApplication.builder()
                .schoolApplicationId(1L)
                .schoolName(request.getSchoolName())
                .schoolAdminEmail(request.getSchoolAdminEmail())
                .schoolPhoneNumber(request.getSchoolPhoneNumber())
                .schoolAdminName(request.getSchoolAdminName())
                .state(0)
                .regDate(LocalDateTime.now())
                .build();

        when(schoolApplicationRepository.save(any(SchoolApplication.class))).thenReturn(savedApplication);

        // when
        ResApplicationDefaultDTO result = schoolApplicationService.save(request);

        // then
        assertNotNull(result);
        assertEquals("Test School", result.getSchoolName());
        assertEquals("test@example.com", result.getSchoolAdminEmail());
        assertEquals("123-456-7890", result.getSchoolPhoneNumber());
        assertEquals("admin", result.getSchoolAdminName());
    }

    @Test
    public void testFindAll() {
        // given
        List<SchoolApplication> applications = new ArrayList<>();
        applications.add(new SchoolApplication(1L,"School A", "123-456-7890","admin A","adminA@example.com", 0, 0,"7126231"));
        applications.add(new SchoolApplication(2L, "School B", "987-654-3210", "admin B", "adminB@example.com", 0, 0,"7126231"));

        when(schoolApplicationRepository.findAll()).thenReturn(applications);

        // when
        List<ResApplicationDefaultDTO> result = schoolApplicationService.findAll();

        // then
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(2, result.size());
        assertEquals("School A", result.get(0).getSchoolName());
        assertEquals("adminA@example.com", result.get(0).getSchoolAdminEmail());
        assertEquals("123-456-7890", result.get(0).getSchoolPhoneNumber());
    }

    @Test
    public void testFindById() {
        // given
        Long applicationId = 1L;
        SchoolApplication application = new SchoolApplication(applicationId, "Test School", "123-456-7890","admin A", "adminA@example.com", 0, 0,"7126231");

        when(schoolApplicationRepository.findById(applicationId)).thenReturn(Optional.of(application));

        // when
        ResApplicationDefaultDTO result = schoolApplicationService.findById(applicationId);

        // then
        assertNotNull(result);
        assertEquals(applicationId, result.getSchoolApplicationId());
        assertEquals("Test School", result.getSchoolName());
        assertEquals("adminA@example.com", result.getSchoolAdminEmail());
        assertEquals("123-456-7890", result.getSchoolPhoneNumber());
    }

    @Test
    public void testChangeState() {
        // given
        Long applicationId = 1L;
        int newState = 1;
        SchoolApplication application = new SchoolApplication(applicationId, "Test School", "123-456-7890","admin A", "adminA@example.com", 0, 0, "7126231");

        SchoolApplication savedApplication = SchoolApplication.builder()
                .schoolApplicationId(1L)
                .schoolName(application.getSchoolName())
                .schoolAdminEmail(application.getSchoolAdminEmail())
                .schoolPhoneNumber(application.getSchoolPhoneNumber())
                .schoolAdminName(application.getSchoolAdminName())
                .state(newState)
                .regDate(LocalDateTime.now())
                .build();

        when(schoolApplicationRepository.findById(applicationId)).thenReturn(Optional.of(application));
        when(schoolApplicationRepository.save(any(SchoolApplication.class))).thenReturn(savedApplication);

        // when
        ResApplicationDefaultDTO result = schoolApplicationService.changeState(applicationId, newState);

        // then
        assertNotNull(result);
        assertEquals(applicationId, result.getSchoolApplicationId());
        assertEquals("Test School", result.getSchoolName());
        assertEquals("adminA@example.com", result.getSchoolAdminEmail());
        assertEquals("123-456-7890", result.getSchoolPhoneNumber());
        assertEquals(newState, result.getState());
    }
}
