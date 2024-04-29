package com.withSchool.feat.feat_12_2;
import com.withSchool.dto.classes.ClassDTO;
import org.junit.jupiter.api.Test;

import com.google.gson.Gson;
import com.withSchool.controller.admin.AdminController;
import com.withSchool.service.classes.ClassService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@ExtendWith(SpringExtension.class)
@WebMvcTest(AdminController.class)
@AutoConfigureMockMvc
public class AdminControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private ClassService classService;

    @Test
    public void testGetAllClassesBySchoolId() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/classes/{schoolId}", "7130166")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
        // 나머지 코드 생략
    }

    @Test
    public void testGetAllClassesBySchoolIdAndGrade() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/classes/{schoolId}/{grade}", "7130166", 1)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
        // 나머지 코드 생략
    }

    @Test
    public void testGetAllClassesBySchoolIdAndGradeAndInClass() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/classes/{schoolId}/{grade}/{inClass}", "7130166", 1, 1)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
        // 나머지 코드 생략
    }

    @Test
    public void testGetClassById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/classes/{classId}", 123L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
        // 나머지 코드 생략
    }

    @Test
    public void testUpdateClassInformation() throws Exception {
        ClassDTO classDTO = ClassDTO.builder()
                .classId(123L)
                .grade(1)
                .inClass(1)
                .schoolId(7130166L)
                .build();
        String jsonPayload = gson.toJson(classDTO);

        mockMvc.perform(MockMvcRequestBuilders.patch("/classes/{classId}/update", 123L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("해당 반이 수정되었습니다."));
    }

    @Test
    public void testDeleteClassInformation() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/classes/{classId}/delete", 123L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("해당 반이 삭제되었습니다."));
    }
}

