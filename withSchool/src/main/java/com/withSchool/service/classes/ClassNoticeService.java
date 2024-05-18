package com.withSchool.service.classes;

import com.withSchool.dto.basic.ReqNoticeDTO;
import com.withSchool.dto.basic.ResNoticeDTO;
import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.school.SchoolNoticeDTO;
import com.withSchool.entity.classes.ClassNotice;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.entity.user.User;
import com.withSchool.repository.classes.ClassNoticeRepository;
import com.withSchool.service.file.FileService;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClassNoticeService {
    private final UserService userService;
    private final ClassNoticeRepository classNoticeRepository;
    private final FileService fileService;
    @Transactional
    public ResNoticeDTO save(ReqNoticeDTO reqNoticeDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User teacher = userService.findById(authentication.getName());

        ClassNotice classNotice = ClassNotice.builder()
                .title(reqNoticeDTO.getTitle())
                .content(reqNoticeDTO.getContent())
                .teacher(teacher)
                .classInformation(teacher.getClassInformation())
                .build();

        ClassNotice result = classNoticeRepository.save(classNotice);
        // schoolNoticeDTO의 MultiPartFile 리스트를 가져와서 s3 스토리지에 저장하는 로직 구현
        List<MultipartFile> files = reqNoticeDTO.getFile();
        for(MultipartFile s : files){
            if(!s.isEmpty()) {
                FileDTO fileDTO = FileDTO.builder()
                        .file(s)
                        .repoType("classNotice")
                        .masterId(teacher.getClassInformation().getClassId())
                        .build();
                fileService.saveFile(fileDTO);
            }
        }

        return ResNoticeDTO.builder()
                .title(result.getTitle())
                .content(result.getContent())
                .user(teacher.getName())
                .regDate(LocalDateTime.now())
                .build();
    }
}
