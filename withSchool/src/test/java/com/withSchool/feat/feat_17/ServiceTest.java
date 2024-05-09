package com.withSchool.feat.feat_17;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.user.User;
import com.withSchool.service.file.FileService;
import com.withSchool.service.school.SchoolNoticeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

public class ServiceTest {
    @Test
    public void 학교_공지사항_파일_저장로직(){
        FileService fileService = mock(FileService.class);

        User user = mock(User.class);
        SchoolInformation schoolInformation = mock(SchoolInformation.class);
        MockMultipartFile mockMultipartFile = new MockMultipartFile(
                "file", // form에서의 파일 파라미터 이름
                "test.txt", // 업로드 될 파일의 이름
                "text/plain", // 파일의 타입
                "Hello, World!".getBytes()); // 파일의 내용

        List<MultipartFile> multipartFileList = new ArrayList<>();
        multipartFileList.add(mockMultipartFile);
        for(MultipartFile s : multipartFileList){
            FileDTO fileDTO = FileDTO.builder()
                    .file(s)
                    .masterId(schoolInformation.getSchoolId())
                    .build();
            fileService.saveSchoolNoticeFile(fileDTO);
        }
    }

}
