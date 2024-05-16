package com.withSchool.service.school;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.school.ReqSchoolNoticeDTO;
import com.withSchool.dto.school.SchoolNoticeDTO;
import com.withSchool.dto.school.ResSchoolNoticeDTO;
import com.withSchool.dto.user.StudentListDTO;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.entity.school.SchoolNoticeFile;
import com.withSchool.entity.user.User;
import com.withSchool.repository.file.SchoolNoticeFileRepository;
import com.withSchool.repository.school.SchoolNoticeRepository;
import com.withSchool.service.file.FileService;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    public SchoolNotice save(SchoolNoticeDTO schoolNoticeDTO) {
        SchoolNotice schoolNotice = SchoolNotice.builder()
                .title(schoolNoticeDTO.getTitle())
                .content(schoolNoticeDTO.getContent())
                .user(schoolNoticeDTO.getUser())
                .schoolInformation(schoolNoticeDTO.getSchool())
                .build();
        SchoolNotice notice = schoolNoticeRepository.save(schoolNotice);
        // schoolNoticeDTO의 MultiPartFile 리스트를 가져와서 s3 스토리지에 저장하는 로직 구현
        List<MultipartFile> files = schoolNoticeDTO.getFile();
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
        return notice;
    }

    @Transactional
    public ResSchoolNoticeDTO findById(Long schoolNoticeId) {
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

        StudentListDTO studentListDTO = StudentListDTO.builder()
                .id(schoolNotice.getUser().getId())
                .name(schoolNotice.getUser().getName())
                .userId(schoolNotice.getUser().getUserId())
                .build();

        return ResSchoolNoticeDTO.builder()
                .title(schoolNotice.getTitle())
                .content(schoolNotice.getContent())
                .user(studentListDTO)
                .filesURl(filesUrl)
                .originalName(orignalName)
                .regDate(schoolNotice.getRegDate())
                .build();
    }

    @Transactional
    public List<ResSchoolNoticeDTO> findAll() {
        User user = userService.getCurrentUser();
        List<SchoolNotice> schoolNotices = schoolNoticeRepository.findAllBySchoolId(user.getSchoolInformation().getSchoolId());

        List<ResSchoolNoticeDTO> resSchoolNoticeDTOS = new ArrayList<>();

        for (SchoolNotice s : schoolNotices) {
            StudentListDTO studentListDTO = StudentListDTO.builder()
                    .id(s.getUser().getId())
                    .name(s.getUser().getName())
                    .userId(s.getUser().getUserId())
                    .build();

            ResSchoolNoticeDTO schoolNoticeDTO = ResSchoolNoticeDTO.builder()
                    .title(s.getTitle())
                    .user(studentListDTO)
                    .content(s.getContent())
                    .regDate(s.getRegDate())
                    .build();

            resSchoolNoticeDTOS.add(schoolNoticeDTO);
        }

        return resSchoolNoticeDTOS;
    }

    @Transactional
    public SchoolNotice updateById(Long schoolNoticeId, ReqSchoolNoticeDTO reqSchoolNoticeDTO) {
        Optional<SchoolNotice> schoolNoticeOptional = schoolNoticeRepository.findById(schoolNoticeId);


        if (schoolNoticeOptional.isPresent()) {
            SchoolNotice schoolNotice = schoolNoticeOptional.get();

            String title = reqSchoolNoticeDTO.getTitle();
            String content = reqSchoolNoticeDTO.getContent();

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
            List<MultipartFile> dtoFile = reqSchoolNoticeDTO.getFile();
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
                        .originalName(files.getOriginalName())
                        .repoType("schoolNotice")
                        .masterId(schoolNoticeId)
                        .build();
                fileService.deleteSchoolNoticeFile(dto);
            }
        }
    }
    public void deleteById(Long schoolNoticeId) {
        //공지사항에 연관된 file들 먼저 삭제
        this.deleteFileById(schoolNoticeId);
        schoolNoticeRepository.deleteById(schoolNoticeId);
    }
}
