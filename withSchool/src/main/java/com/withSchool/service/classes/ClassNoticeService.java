package com.withSchool.service.classes;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.school.ReqNoticeDTO;
import com.withSchool.dto.school.ResNoticeDTO;
import com.withSchool.dto.user.ResUserDefaultDTO;
import com.withSchool.entity.classes.ClassNotice;
import com.withSchool.entity.classes.ClassNoticeFile;
import com.withSchool.entity.user.User;
import com.withSchool.repository.classes.ClassNoticeRepository;
import com.withSchool.repository.file.ClassNoticeFileRepository;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClassNoticeService {
    private final UserService userService;
    private final ClassNoticeRepository classNoticeRepository;
    private final ClassNoticeFileRepository classNoticeFileRepository;
    private final FileService fileService;


    @Transactional
    public ResNoticeDTO save(ReqNoticeDTO reqNoticeDTO) {
        try {
            // 인증 정보에서 사용자 ID를 가져옴
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || authentication.getName() == null) {
                throw new IllegalArgumentException("인증 정보가 유효하지 않습니다.");
            }

            // 사용자 정보를 조회
            User teacher = userService.findById(authentication.getName());
            if (teacher == null) {
                throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
            }

            // ClassNotice 객체 생성
            ClassNotice classNotice = ClassNotice.builder()
                    .title(reqNoticeDTO.getTitle())
                    .content(reqNoticeDTO.getContent())
                    .teacher(teacher)
                    .classInformation(teacher.getClassInformation())
                    .build();

            // ClassNotice 저장
            ClassNotice result = classNoticeRepository.save(classNotice);

            // 파일 처리
            List<MultipartFile> files = reqNoticeDTO.getFile();
            for (MultipartFile s : files) {
                if (!s.isEmpty()) {
                    FileDTO fileDTO = FileDTO.builder()
                            .file(s)
                            .repoType("classNotice")
                            .masterId(result.getClassNoticeId())
                            .build();
                    fileService.saveFile(fileDTO);
                }
            }

            // 결과 반환
            return ResNoticeDTO.builder()
                    .noticeId(result.getClassNoticeId())
                    .title(result.getTitle())
                    .content(result.getContent())
                    .user(ResUserDefaultDTO.builder()
                            .userId(teacher.getUserId())
                            .userName(teacher.getId())
                            .name(teacher.getName())
                            .build())
                    .regDate(LocalDateTime.now())
                    .build();
        } catch (Exception e) {
            // 예외 발생 시 로그를 남기고 적절한 응답을 반환
            System.err.println("공지 저장 중 오류 발생: " + e.getMessage());
            throw new RuntimeException("공지 저장 중 오류가 발생했습니다.", e);
        }
    }

    public ResNoticeDTO updateById(Long noticeId, ReqNoticeDTO reqNoticeDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User teacher = userService.findById(authentication.getName());

        Optional<ClassNotice> classNotice = classNoticeRepository.findById(noticeId);

        if (classNotice.isPresent()) {

            String title = reqNoticeDTO.getTitle();
            String content = reqNoticeDTO.getContent();

            ClassNotice result = ClassNotice.builder()
                    .classNoticeId(noticeId)
                    .title(title)
                    .content(content)
                    .teacher(classNotice.get().getTeacher())
                    .classInformation(classNotice.get().getClassInformation())
                    .build();

            ClassNotice resultNotice = classNoticeRepository.save(result);


            // 여기에 해당 공지사항의 S3파일삭제 + db에 정보 삭제
            this.deleteFileById(noticeId);
            //ClientSchoolNoticeDTO의 파일 저장
            List<MultipartFile> dtoFile = reqNoticeDTO.getFile();
            for(MultipartFile s : dtoFile){
                if(!s.isEmpty()){
                    FileDTO fileDTO = FileDTO.builder()
                            .repoType("classNotice")
                            .file(s)
                            .masterId(noticeId)
                            .build();
                    fileService.saveFile(fileDTO);
                }
            }

            return ResNoticeDTO.builder()
                    .noticeId(resultNotice.getClassNoticeId())
                    .title(resultNotice.getTitle())
                    .content(resultNotice.getContent())
                    .user(ResUserDefaultDTO.builder()
                            .userId(teacher.getUserId())
                            .userName(teacher.getId())
                            .name(teacher.getName())
                            .build())
                    .regDate(LocalDateTime.now())
                    .build();
        }

        return null;
    }
    public void deleteFileById(Long noticeId){
        Optional<List<ClassNoticeFile>> fileList = classNoticeFileRepository.findByClassNoticeId(noticeId);
        if(fileList.isPresent()){
            for(ClassNoticeFile files : fileList.get()){
                FileDeleteDTO dto = FileDeleteDTO.builder()
                        .originalName(files.getOriginalName())
                        .repoType("classNotice")
                        .masterId(noticeId)
                        .build();
                fileService.deleteFile(dto);
            }
        }
    }
    public void deleteById(Long noticeId) {
        //공지사항에 연관된 file들 먼저 삭제
        this.deleteFileById(noticeId);
        classNoticeRepository.deleteById(noticeId);
    }

    @Transactional
    public ResNoticeDTO findById(Long noticeId) {
        Optional<ClassNotice> classNotice = classNoticeRepository.findById(noticeId);
        Optional<List<ClassNoticeFile>> classNoticeFile = classNoticeFileRepository.findByClassNoticeId(noticeId);
        List<String> filesUrl = new ArrayList<>();
        List<String> orignalName = new ArrayList<>();
        if(classNoticeFile.isPresent()) {
            for (ClassNoticeFile file : classNoticeFile.get()) {
                filesUrl.add(file.getFileUrl());
                orignalName.add(file.getOriginalName());
            }
        }
        if(classNotice.isEmpty())return null;
       ClassNotice result = classNotice.get();

        ResUserDefaultDTO resUserDefaultDTO = ResUserDefaultDTO.builder()
                .userName(result.getTeacher().getId())
                .name(result.getTeacher().getName())
                .userId(result.getTeacher().getUserId())
                .build();

        return ResNoticeDTO.builder()
                .noticeId(result.getClassNoticeId())
                .title(result.getTitle())
                .content(result.getContent())
                .user(resUserDefaultDTO)
                .filesURl(filesUrl)
                .originalName(orignalName)
                .regDate(result.getRegDate())
                .build();
    }
    @Transactional
    public List<ResNoticeDTO> findAll(User user) {
        List<ClassNotice> classNotices = classNoticeRepository.findAllByClassId(user.getClassInformation().getClassId());

        List<ResNoticeDTO> resNoticeDTOS = new ArrayList<>();

        for (ClassNotice c : classNotices) {
            ResUserDefaultDTO resUserDefaultDTO = ResUserDefaultDTO.builder()
                    .userName(c.getTeacher().getId())
                    .name(c.getTeacher().getName())
                    .userId(c.getTeacher().getUserId())
                    .build();

            ResNoticeDTO classNoticeDTO = ResNoticeDTO.builder()
                    .noticeId(c.getClassNoticeId())
                    .title(c.getTitle())
                    .user(resUserDefaultDTO)
                    .content(c.getContent())
                    .regDate(c.getRegDate())
                    .build();

            resNoticeDTOS.add(classNoticeDTO);
        }

        return resNoticeDTOS;
    }
}
