package com.withSchool.feat_17_2;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.StandardCharsets;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;

@SpringBootTest
@WebMvcTest
public class NoticeFileUploadTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void 파일업로드테스트(){
        MockMultipartFile mockMultipartFile = new MockMultipartFile("file","test.txt","text/plain","Test content".getBytes(StandardCharsets.UTF_8));
        this.mockMvc.perform(multipart("")).fi
    }
}
