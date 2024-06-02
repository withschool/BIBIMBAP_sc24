package com.withSchool.service.school;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.school.ReqNoticeDTO;
import com.withSchool.dto.school.ResNoticeDTO;
import com.withSchool.dto.user.ResUserDefaultDTO;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.entity.school.SchoolNoticeFile;
import com.withSchool.entity.user.User;
import com.withSchool.repository.file.SchoolNoticeFileRepository;
import com.withSchool.repository.school.SchoolNoticeRepository;
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
public class SchoolNoticeService {
    private final SchoolNoticeRepository schoolNoticeRepository;
    private final SchoolNoticeFileRepository schoolNoticeFileRepository;
    private final FileService fileService;
    private final UserService userService;

    @Transactional
    public ResNoticeDTO save(ReqNoticeDTO reqNoticeDTO) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User admin = userService.findById(authentication.getName());

        SchoolNotice schoolNotice = SchoolNotice.builder()
                .title(reqNoticeDTO.getTitle())
                .content(reqNoticeDTO.getContent())
                .user(admin)
                .schoolInformation(admin.getSchoolInformation())
                .build();

        SchoolNotice notice = schoolNoticeRepository.save(schoolNotice);
        // schoolNoticeDTO의 MultiPartFile 리스트를 가져와서 s3 스토리지에 저장하는 로직 구현
        List<MultipartFile> files = reqNoticeDTO.getFile();
        for(MultipartFile s : files){
            if(!s.isEmpty()) {
                FileDTO fileDTO = FileDTO.builder()
                        .file(s)
                        .repoType("schoolNotice")
                        .masterId(notice.getSchoolNoticeId())
                        .build();
                fileService.saveFile(fileDTO);
            }
        }
        return ResNoticeDTO.builder()
                .noticeId(notice.getSchoolNoticeId())
                .title(notice.getTitle())
                .content(notice.getContent())
                .user(ResUserDefaultDTO.builder()
                        .name(admin.getName())
                        .userName(admin.getId())
                        .userId(admin.getUserId())
                        .build())
                .regDate(LocalDateTime.now())
                .build();
    }

    @Transactional
    public ResNoticeDTO findById(Long schoolNoticeId) {
        Optional<SchoolNotice> schoolNoticeOptional = schoolNoticeRepository.findById(schoolNoticeId);
        Optional<List<SchoolNoticeFile>> schoolNoticeFile = schoolNoticeFileRepository.findBySchoolNoticeId(schoolNoticeId);
        List<String> filesUrl = new ArrayList<>();
        List<String> orignalName = new ArrayList<>();
        if(schoolNoticeFile.isPresent()) {
            for (SchoolNoticeFile file : schoolNoticeFile.get()) {
                filesUrl.add(file.getFileUrl());
                orignalName.add(file.getOriginalName());
            }
        }
        if(schoolNoticeOptional.isEmpty())return null;
        SchoolNotice schoolNotice = schoolNoticeOptional.get();

        ResUserDefaultDTO resUserDefaultDTO = ResUserDefaultDTO.builder()
                .userName(schoolNotice.getUser().getId())
                .name(schoolNotice.getUser().getName())
                .userId(schoolNotice.getUser().getUserId())
                .build();

        return ResNoticeDTO.builder()
                .noticeId(schoolNotice.getSchoolNoticeId())
                .title(schoolNotice.getTitle())
                .content(schoolNotice.getContent())
                .user(resUserDefaultDTO)
                .filesURl(filesUrl)
                .originalName(orignalName)
                .regDate(schoolNotice.getRegDate())
                .build();
    }

    @Transactional
    public List<ResNoticeDTO> findAll(Long childId) {
        List<ResNoticeDTO> resNoticeDTOS = new ArrayList<>();
        int currentUserType = userService.getCurrentUser().getAccountType();

        if(currentUserType == 1 && childId == null)return resNoticeDTOS;
        else if(currentUserType != 1 && childId != null)childId = null;

        User user = Optional.ofNullable(childId)
                .map(userService::findByUserId)
                .orElseGet(userService::getCurrentUser);

        List<SchoolNotice> schoolNotices = schoolNoticeRepository.findAllBySchoolId(user.getSchoolInformation().getSchoolId());
        for (SchoolNotice s : schoolNotices) {
            ResUserDefaultDTO resUserDefaultDTO = ResUserDefaultDTO.builder()
                    .userName(s.getUser().getId())
                    .name(s.getUser().getName())
                    .userId(s.getUser().getUserId())
                    .build();

            ResNoticeDTO schoolNoticeDTO = ResNoticeDTO.builder()
                    .noticeId(s.getSchoolNoticeId())
                    .title(s.getTitle())
                    .user(resUserDefaultDTO)
                    .content(s.getContent())
                    .regDate(s.getRegDate())
                    .build();

            resNoticeDTOS.add(schoolNoticeDTO);
        }

        return resNoticeDTOS;
    }

    @Transactional
    public SchoolNotice updateById(Long schoolNoticeId, ReqNoticeDTO reqNoticeDTO) {
        Optional<SchoolNotice> schoolNoticeOptional = schoolNoticeRepository.findById(schoolNoticeId);


        if (schoolNoticeOptional.isPresent()) {
            SchoolNotice schoolNotice = schoolNoticeOptional.get();

            String title = reqNoticeDTO.getTitle();
            String content = reqNoticeDTO.getContent();

            SchoolNotice result = SchoolNotice.builder()
                    .schoolNoticeId(schoolNoticeId)
                    .title(title)
                    .content(content)
                    .user(schoolNotice.getUser())
                    .schoolInformation(schoolNotice.getSchoolInformation())
                    .build();

            SchoolNotice resultNotice = schoolNoticeRepository.save(result);


            // 여기에 해당 공지사항의 S3파일삭제 + db에 정보 삭제
            this.deleteFileById(schoolNoticeId);
            //ClientSchoolNoticeDTO의 파일 저장
            List<MultipartFile> dtoFile = reqNoticeDTO.getFile();
            for(MultipartFile s : dtoFile){
                if(!s.isEmpty()){
                    FileDTO fileDTO = FileDTO.builder()
                            .repoType("schoolNotice")
                            .file(s)
                            .masterId(schoolNoticeId)
                            .build();
                    fileService.saveFile(fileDTO);
                }
            }

            return resultNotice;
        }

        return null;
    }
    public void deleteFileById(Long schoolNoticeId){
        Optional<List<SchoolNoticeFile>> fileList = schoolNoticeFileRepository.findBySchoolNoticeId(schoolNoticeId);
        if(fileList.isPresent()){
            for(SchoolNoticeFile files : fileList.get()){
                FileDeleteDTO dto = FileDeleteDTO.builder()
                        .savedName(files.getSavedName())
                        .repoType("schoolNotice")
                        .masterId(schoolNoticeId)
                        .build();
                fileService.deleteFile(dto);
            }
        }
    }
    public void deleteById(Long schoolNoticeId) {
        //공지사항에 연관된 file들 먼저 삭제
        this.deleteFileById(schoolNoticeId);
        schoolNoticeRepository.deleteById(schoolNoticeId);
    }
}
