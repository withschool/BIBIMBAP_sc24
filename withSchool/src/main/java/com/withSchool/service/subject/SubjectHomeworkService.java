package com.withSchool.service.subject;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.subject.ReqHomeworkCreateDTO;
import com.withSchool.dto.subject.ReqHomeworkSubmitDTO;
import com.withSchool.dto.subject.ResHomeworkDTO;
import com.withSchool.dto.subject.ResHomeworkSubmitDTO;
import com.withSchool.entity.subject.*;
import com.withSchool.entity.user.User;
import com.withSchool.repository.file.SubjectHomeworkFileRepository;
import com.withSchool.repository.file.SubjectHomeworkSubmitFileRepository;
import com.withSchool.repository.mapping.StudentSubjectRepository;
import com.withSchool.repository.subject.SubjectHomeworkRepository;
import com.withSchool.repository.subject.SubjectHomeworkSubmitRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.service.file.FileService;
import com.withSchool.service.mapping.StudentSubjectService;
import com.withSchool.service.user.NotificationService;
import com.withSchool.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubjectHomeworkService {
    private final SubjectHomeworkRepository subjectHomeworkRepository;
    private final SubjectHomeworkSubmitRepository subjectHomeworkSubmitRepository;
    private final SubjectHomeworkFileRepository subjectHomeworkFileRepository;
    private final SubjectHomeworkSubmitFileRepository subjectHomeworkSubmitFileRepository;
    private final SubjectRepository subjectRepository;
    private final StudentSubjectService studentSubjectService;
    private final FileService fileService;
    private final UserService userService;
    private final NotificationService notificationService;
    @Transactional
    public ResHomeworkDTO save(ReqHomeworkCreateDTO reqHomeworkCreateDTO) {

        Optional<Subject> subject = subjectRepository.findById(reqHomeworkCreateDTO.getId());

        if(subject.isPresent()) {
            SubjectHomework subjectHomework = SubjectHomework.builder()
                    .subjectHomeworkTitle(reqHomeworkCreateDTO.getTitle())
                    .subjectHomeworkContent(reqHomeworkCreateDTO.getContent())
                    .SubjectHomeworkDue(reqHomeworkCreateDTO.getDue())
                    .subject(subject.get())
                    .build();

            SubjectHomework result = subjectHomeworkRepository.save(subjectHomework);

            List<MultipartFile> files = reqHomeworkCreateDTO.getFiles();
            for(MultipartFile s : files){
                if(!s.isEmpty()) {
                    FileDTO fileDTO = FileDTO.builder()
                            .file(s)
                            .repoType("subjectHomework")
                            .masterId(result.getSubjectHomeworkId())
                            .build();
                    fileService.saveFile(fileDTO);
                }
            }

            List<User> userList = studentSubjectService.findSugangStudent(reqHomeworkCreateDTO.getId());
            notificationService.sendSMSGroup(userList, "과목 과제가", reqHomeworkCreateDTO.getTitle(), true);

            return ResHomeworkDTO.builder()
                    .id(result.getSubjectHomeworkId())
                    .title(result.getSubjectHomeworkTitle())
                    .content(result.getSubjectHomeworkContent())
                    .due(result.getSubjectHomeworkDue())
                    .build();
        }
        else{
            throw new NoSuchElementException("there's no subject");
        }
    }

    public ResHomeworkDTO update(Long homeworkId, ReqHomeworkCreateDTO req) {

        Optional<SubjectHomework> originalSubjectHomework = subjectHomeworkRepository.findById(homeworkId);


        if (originalSubjectHomework.isPresent()) {

            String title = req.getTitle();
            String content = req.getContent();
            LocalDateTime due = req.getDue();

            SubjectHomework result = SubjectHomework.builder()
                    .subjectHomeworkId(homeworkId)
                    .subjectHomeworkTitle(title)
                    .subjectHomeworkContent(content)
                    .SubjectHomeworkDue(due)
                    .subject(originalSubjectHomework.get().getSubject())
                    .build();

            SubjectHomework subjectHomework = subjectHomeworkRepository.save(result);

            // 여기에 해당 공지사항의 S3파일삭제 + db에 정보 삭제
            this.deleteFileById(homeworkId);
            //ClientSchoolNoticeDTO의 파일 저장
            List<MultipartFile> dtoFile = req.getFiles();
            for(MultipartFile s : dtoFile){
                if(!s.isEmpty()){
                    FileDTO fileDTO = FileDTO.builder()
                            .repoType("subjectHomework")
                            .file(s)
                            .masterId(homeworkId)
                            .build();
                    fileService.saveFile(fileDTO);
                }
            }

            return ResHomeworkDTO.builder()
                    .id(subjectHomework.getSubjectHomeworkId())
                    .title(subjectHomework.getSubjectHomeworkTitle())
                    .content(subjectHomework.getSubjectHomeworkContent())
                    .due(subjectHomework.getSubjectHomeworkDue())
                    .build();
        }

        return null;
    }
    public List<ResHomeworkDTO> getList(Long subjectId) {
        List<ResHomeworkDTO> homeworkDTOList = new ArrayList<>();
        List<SubjectHomework> subjectHomeworkList = subjectHomeworkRepository.findAlLBySubjectId(subjectId);

        for(SubjectHomework s : subjectHomeworkList){
            Optional<List<SubjectHomeworkFile>> subjectHomeworkFiles = subjectHomeworkFileRepository.findBySubjectHomeworkId(s.getSubjectHomeworkId());
            List<String> filesUrl = new ArrayList<>();
            List<String> orignalName = new ArrayList<>();
            if(subjectHomeworkFiles.isPresent()) {
                for (SubjectHomeworkFile file : subjectHomeworkFiles.get()) {
                    filesUrl.add(file.getFileUrl());
                    orignalName.add(file.getOriginalName());
                }
            }
            ResHomeworkDTO resHomeworkDTO = ResHomeworkDTO.builder()
                    .id(s.getSubjectHomeworkId())
                    .title(s.getSubjectHomeworkTitle())
                    .content(s.getSubjectHomeworkContent())
                    .due(s.getSubjectHomeworkDue())
                    .filesURl(filesUrl)
                    .originalName(orignalName)
                    .build();
            homeworkDTOList.add(resHomeworkDTO);
        }
        return homeworkDTOList;
    }

    public void delete(Long homeworkId) {
        this.deleteFileById(homeworkId);
        subjectHomeworkRepository.deleteById(homeworkId);
    }
    public void deleteFileById(Long homeworkId){
        Optional<List<SubjectHomeworkFile>> fileList = subjectHomeworkFileRepository.findBySubjectHomeworkId(homeworkId);
        if(fileList.isPresent()){
            for(SubjectHomeworkFile files : fileList.get()){
                FileDeleteDTO dto = FileDeleteDTO.builder()
                        .savedName(files.getSavedName())
                        .repoType("subjectHomework")
                        .masterId(homeworkId)
                        .build();
                fileService.deleteFile(dto);
            }
        }
    }

    public String submit(ReqHomeworkSubmitDTO reqHomeworkSubmitDTO) throws Exception {
        User student = userService.getCurrentUser();

        Optional<SubjectHomework> subjectHomework = subjectHomeworkRepository.findById(reqHomeworkSubmitDTO.getHomeworkId());
        if(subjectHomework.isEmpty()){
            throw new Exception("Homework not found with id");
        }
        Optional<SubjectHomeworkSubmit> exist = subjectHomeworkSubmitRepository.findByUserIdHomeworkId(student.getUserId(), reqHomeworkSubmitDTO.getHomeworkId());
        if(exist.isPresent()){
            throw new Exception("submit homework already exist");
        }
        SubjectHomeworkSubmit subjectHomeworkSubmit = SubjectHomeworkSubmit.builder()
                .subjectSubmitContent(reqHomeworkSubmitDTO.getContent())
                .subjectHomework(subjectHomework.get())
                .user(student)
                .build();
        SubjectHomeworkSubmit result = subjectHomeworkSubmitRepository.save(subjectHomeworkSubmit);

        List<MultipartFile> files = reqHomeworkSubmitDTO.getFiles();
        for(MultipartFile s : files){
            if(!s.isEmpty()) {
                FileDTO fileDTO = FileDTO.builder()
                        .file(s)
                        .repoType("subjectHomeworkSubmit")
                        .masterId(result.getSubjectHomeworkSubmitId())
                        .build();
                fileService.saveFile(fileDTO);
            }
        }
        return "Homework submitted successfully.";
    }

    public Long getId(Long homeworkId) {
        User user = userService.getCurrentUser();
        Optional<SubjectHomeworkSubmit> subjectHomeworkSubmit = subjectHomeworkSubmitRepository.findByUserIdHomeworkId(user.getUserId(),homeworkId);
        if(subjectHomeworkSubmit.isPresent()){
            return subjectHomeworkSubmit.get().getSubjectHomeworkSubmitId();
        }
        else{
            return null;
        }
    }

    public List<ResHomeworkSubmitDTO> getAll(Long homeworkId) {
        List<ResHomeworkSubmitDTO> result = new ArrayList<>();
        Optional<List<SubjectHomeworkSubmit>> subjectHomeworkSubmitList = subjectHomeworkSubmitRepository.findAllByHomeworkId(homeworkId);
        if(subjectHomeworkSubmitList.isPresent()){
            for(SubjectHomeworkSubmit s : subjectHomeworkSubmitList.get()){
                Optional<List<SubjectHomeworkSubmitFile>> subjectHomeworkSubmitFileList = subjectHomeworkSubmitFileRepository.findBySubjectHomeworkSubmitId(s.getSubjectHomeworkSubmitId());
                List<String> filesUrl = new ArrayList<>();
                List<String> originalName = new ArrayList<>();
                if(subjectHomeworkSubmitFileList.isPresent()) {
                    for (SubjectHomeworkSubmitFile file : subjectHomeworkSubmitFileList.get()) {
                        filesUrl.add(file.getFileUrl());
                        originalName.add(file.getOriginalName());
                    }
                }
                ResHomeworkSubmitDTO resHomeworkSubmitDTO = ResHomeworkSubmitDTO.builder()
                        .id(s.getSubjectHomeworkSubmitId())
                        .content(s.getSubjectSubmitContent())
                        .originalName(originalName)
                        .filesURl(filesUrl)
                        .build();

                result.add(resHomeworkSubmitDTO);
            }
            return result;
        }
        return null;
    }

    public ResHomeworkSubmitDTO getOne(Long subjectHomeworkSubmitId) {
        Optional<SubjectHomeworkSubmit> subjectHomeworkSubmit = subjectHomeworkSubmitRepository.findById(subjectHomeworkSubmitId);
        if(subjectHomeworkSubmit.isPresent()){
            Optional<List<SubjectHomeworkSubmitFile>> subjectHomeworkSubmitFiles = subjectHomeworkSubmitFileRepository.findBySubjectHomeworkSubmitId(subjectHomeworkSubmitId);
            List<String> filesUrl = new ArrayList<>();
            List<String> originalName = new ArrayList<>();
            if(subjectHomeworkSubmitFiles.isPresent()) {
                for (SubjectHomeworkSubmitFile file : subjectHomeworkSubmitFiles.get()) {
                    filesUrl.add(file.getFileUrl());
                    originalName.add(file.getOriginalName());
                }
            }

            return ResHomeworkSubmitDTO.builder()
                    .id(subjectHomeworkSubmit.get().getSubjectHomeworkSubmitId())
                    .content(subjectHomeworkSubmit.get().getSubjectSubmitContent())
                    .filesURl(filesUrl)
                    .originalName(originalName)
                    .build();
        }
        return null;
    }

    public String updateSubmit(Long subjectHomeworkSubmitId, ReqHomeworkSubmitDTO reqHomeworkSubmitDTO) throws Exception {
        User user = userService.getCurrentUser();
        Optional<SubjectHomeworkSubmit> subjectHomeworkSubmit = subjectHomeworkSubmitRepository.findById(subjectHomeworkSubmitId);
        if(subjectHomeworkSubmit.isEmpty()){
            throw new Exception("HomeworkSubmit not found with id");
        }
        SubjectHomeworkSubmit updateSubjectHomeworkSubmit =SubjectHomeworkSubmit.builder()
                .subjectHomeworkSubmitId(subjectHomeworkSubmitId)
                .subjectSubmitContent(reqHomeworkSubmitDTO.getContent())
                .user(user)
                .subjectHomework(subjectHomeworkSubmit.get().getSubjectHomework())
                .build();
        subjectHomeworkSubmitRepository.save(updateSubjectHomeworkSubmit);

        this.deleteSubmitFileById(subjectHomeworkSubmitId);

        List<MultipartFile> dtoFile = reqHomeworkSubmitDTO.getFiles();
        for(MultipartFile s : dtoFile){
            if(!s.isEmpty()){
                FileDTO fileDTO = FileDTO.builder()
                        .repoType("subjectHomeworkSubmit")
                        .file(s)
                        .masterId(subjectHomeworkSubmitId)
                        .build();
                fileService.saveFile(fileDTO);
            }
        }
        return "Homework update successfully.";
    }
    public void deleteSubmit(Long homeworkSubmitId) {
        this.deleteFileById(homeworkSubmitId);
        subjectHomeworkSubmitRepository.deleteById(homeworkSubmitId);
    }
    public void deleteSubmitFileById(Long homeworkSubmitId){
        Optional<List<SubjectHomeworkSubmitFile>> fileList = subjectHomeworkSubmitFileRepository.findBySubjectHomeworkSubmitId(homeworkSubmitId);
        if(fileList.isPresent()){
            for(SubjectHomeworkSubmitFile files : fileList.get()){
                FileDeleteDTO dto = FileDeleteDTO.builder()
                        .savedName(files.getSavedName())
                        .repoType("subjectHomeworkSubmit")
                        .masterId(homeworkSubmitId)
                        .build();
                fileService.deleteFile(dto);
            }
        }
    }
}
