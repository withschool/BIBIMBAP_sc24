package com.withSchool.service.subject;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.school.ReqNoticeDTO;
import com.withSchool.dto.school.ResNoticeDTO;
import com.withSchool.dto.subject.ReqSubjectNoticeDTO;
import com.withSchool.dto.user.ResUserDefaultDTO;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.subject.SubjectNotice;
import com.withSchool.entity.subject.SubjectNoticeFile;
import com.withSchool.entity.user.User;
import com.withSchool.repository.file.SubjectNoticeFileRepository;
import com.withSchool.repository.mapping.TeacherSubjectRepository;
import com.withSchool.repository.subject.SubjectNoticeRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.service.file.FileService;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class SubjectNoticeService {
    private final UserService userService;
    private final FileService fileService;
    private final SubjectNoticeRepository subjectNoticeRepository;
    private final SubjectNoticeFileRepository subjectNoticeFileRepository;
    private final TeacherSubjectRepository teacherSubjectRepository;
    private final SubjectRepository subjectRepository;
    @Transactional
    public ResNoticeDTO save(ReqSubjectNoticeDTO reqSubjectNoticeDTO) {

        User teacher = userService.getCurrentUser();
        Subject subject = subjectRepository.findById(reqSubjectNoticeDTO.getSubjectId()).orElseThrow();

        SubjectNotice subjectNotice = SubjectNotice.builder()
                .title(reqSubjectNoticeDTO.getTitle())
                .content(reqSubjectNoticeDTO.getContent())
                .user(teacher)
                .subject(subject)
                .build();

        SubjectNotice result = subjectNoticeRepository.save(subjectNotice);

        List<MultipartFile> files = reqSubjectNoticeDTO.getFile();
        for(MultipartFile s : files){
            if(!s.isEmpty()) {
                FileDTO fileDTO = FileDTO.builder()
                        .file(s)
                        .repoType("subjectNotice")
                        .masterId(result.getSubjectNoticeId())
                        .build();
                fileService.saveFile(fileDTO);
            }
        }

        return ResNoticeDTO.builder()
                .noticeId(result.getSubjectNoticeId())
                .title(result.getTitle())
                .content(result.getContent())
                .user(ResUserDefaultDTO.builder()
                        .userId(teacher.getUserId())
                        .userName(teacher.getId())
                        .name(teacher.getName())
                        .build())
                .regDate(LocalDateTime.now())
                .build();
    }
    public ResNoticeDTO updateById(Long noticeId, ReqNoticeDTO reqNoticeDTO) {

        User teacher = userService.getCurrentUser();

        Optional<SubjectNotice> subjectNotice = subjectNoticeRepository.findById(noticeId);

        if (subjectNotice.isPresent()) {

            String title = reqNoticeDTO.getTitle();
            String content = reqNoticeDTO.getContent();

            SubjectNotice result = SubjectNotice.builder()
                    .subjectNoticeId(noticeId)
                    .title(title)
                    .content(content)
                    .user(teacher)
                    .subject(subjectNotice.get().getSubject())
                    .build();

            SubjectNotice resultNotice = subjectNoticeRepository.save(result);


            // 여기에 해당 공지사항의 S3파일삭제 + db에 정보 삭제
            this.deleteFileById(noticeId);
            //ClientSchoolNoticeDTO의 파일 저장
            List<MultipartFile> dtoFile = reqNoticeDTO.getFile();
            for(MultipartFile s : dtoFile){
                if(!s.isEmpty()){
                    FileDTO fileDTO = FileDTO.builder()
                            .repoType("subjectNotice")
                            .file(s)
                            .masterId(noticeId)
                            .build();
                    fileService.saveFile(fileDTO);
                }
            }

            return ResNoticeDTO.builder()
                    .noticeId(resultNotice.getSubjectNoticeId())
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
        Optional<List<SubjectNoticeFile>> fileList = subjectNoticeFileRepository.findBySubjectNoticeId(noticeId);
        if(fileList.isPresent()){
            for(SubjectNoticeFile files : fileList.get()){
                FileDeleteDTO dto = FileDeleteDTO.builder()
                        .savedName(files.getSavedName())
                        .repoType("subjectNotice")
                        .masterId(noticeId)
                        .build();
                fileService.deleteFile(dto);
            }
        }
    }
    public void deleteById(Long noticeId) {
        //공지사항에 연관된 file들 먼저 삭제
        this.deleteFileById(noticeId);
        subjectNoticeRepository.deleteById(noticeId);
    }

    @Transactional
    public ResNoticeDTO findById(Long noticeId) {
        Optional<SubjectNotice> subjectNotice = subjectNoticeRepository.findById(noticeId);
        Optional<List<SubjectNoticeFile>> subjectNoticeFiles = subjectNoticeFileRepository.findBySubjectNoticeId(noticeId);
        List<String> filesUrl = new ArrayList<>();
        List<String> originalName = new ArrayList<>();
        if(subjectNoticeFiles.isPresent()) {
            for (SubjectNoticeFile file : subjectNoticeFiles.get()) {
                filesUrl.add(file.getFileUrl());
                originalName.add(file.getOriginalName());
            }
        }
        if(subjectNotice.isEmpty())return null;
        SubjectNotice result = subjectNotice.get();

        ResUserDefaultDTO resUserDefaultDTO = ResUserDefaultDTO.builder()
                .userName(result.getUser().getId())
                .name(result.getUser().getName())
                .userId(result.getUser().getUserId())
                .build();

        return ResNoticeDTO.builder()
                .noticeId(result.getSubjectNoticeId())
                .title(result.getTitle())
                .content(result.getContent())
                .user(resUserDefaultDTO)
                .filesURl(filesUrl)
                .originalName(originalName)
                .regDate(result.getRegDate())
                .build();
    }
    @Transactional
    public List<ResNoticeDTO> findAll(Long subjectId) {
        User user = userService.getCurrentUser();
        List<SubjectNotice> subjectNotices = subjectNoticeRepository.findAllBySubjectId(subjectId);

        List<ResNoticeDTO> resNoticeDTOS = new ArrayList<>();

        for (SubjectNotice s : subjectNotices) {
            ResUserDefaultDTO resUserDefaultDTO = ResUserDefaultDTO.builder()
                    .userName(s.getUser().getId())
                    .name(s.getUser().getName())
                    .userId(s.getUser().getUserId())
                    .build();

            ResNoticeDTO classNoticeDTO = ResNoticeDTO.builder()
                    .noticeId(s.getSubjectNoticeId())
                    .title(s.getTitle())
                    .user(resUserDefaultDTO)
                    .content(s.getContent())
                    .regDate(s.getRegDate())
                    .build();

            resNoticeDTOS.add(classNoticeDTO);
        }

        return resNoticeDTOS;
    }
}
