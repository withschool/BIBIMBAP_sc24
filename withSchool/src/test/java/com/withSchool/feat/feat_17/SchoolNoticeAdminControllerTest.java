package com.withSchool.feat.feat_17;

import com.withSchool.controller.admin.AdminController;
import com.withSchool.dto.school.ReqNoticeDTO;
import com.withSchool.dto.school.SchoolNoticeDTO;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.entity.user.User;
import com.withSchool.service.school.SchoolNoticeService;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class SchoolNoticeAdminControllerTest {
    @InjectMocks
    private AdminController adminController;
    @Mock
    private UserService userService;

    @Mock
    private SchoolNoticeService schoolNoticeService;

    private MockMvc mockMvc;

    @BeforeEach
    public void init(){
        mockMvc = MockMvcBuilders.standaloneSetup(adminController).build();
    }
    @BeforeEach
    public void setup() {
        Authentication authentication = new UsernamePasswordAuthenticationToken("user", null, List.of(new SimpleGrantedAuthority("ADMIN")));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    MockMultipartFile mockMultipartFile = new MockMultipartFile(
            "file",
            "test.txt",
            "text/plain",
            "Hello, World!".getBytes());

    SchoolNotice schoolNotice = SchoolNotice.builder()
            .content("내용실험")
            .title("제목실험")
            .build();
    User user = User.builder()
            .userId(12L)
            .userCode("userCode")
            .accountType(3)
            .build();
    @DisplayName("학교 공지 업로드")
    @Test
    public void 학교_공지_업로드() throws Exception {
        //given
        List<MultipartFile> files = new ArrayList<>();
        files.add(mockMultipartFile);

        ReqNoticeDTO request = ReqNoticeDTO.builder()
                .title("제목실험")
                .content("내용실험")
                .file(files)
                .build();

        when(userService.findById(anyString())).thenReturn(user);
        doReturn(schoolNotice).when(schoolNoticeService).save(any(SchoolNoticeDTO.class));


        Map<String, Object> response = new HashMap<>();
        response.put("id",schoolNotice.getSchoolNoticeId());
        response.put("title",schoolNotice.getTitle());
        response.put("content",schoolNotice.getContent());


        //when
        ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.multipart("/admin/schools/notices")
                        .file(mockMultipartFile)
                        .param("title","제목실험")
                        .param("content","내용실험")
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        );

        //then
        MvcResult mvcResult = resultActions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(response.get("id")))
                .andExpect(jsonPath("$.title").value(response.get("title")))
                .andExpect(jsonPath("$.content").value(response.get("content")))
                .andReturn();
    }
}
