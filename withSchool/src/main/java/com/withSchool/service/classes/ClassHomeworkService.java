package com.withSchool.service.classes;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.subject.ReqHomeworkCreateDTO;
import com.withSchool.dto.subject.ReqHomeworkSubmitDTO;
import com.withSchool.dto.subject.ResHomeworkDTO;
import com.withSchool.dto.subject.ResHomeworkSubmitDTO;
import com.withSchool.entity.classes.*;
import com.withSchool.entity.subject.SubjectHomeworkSubmit;
import com.withSchool.entity.user.User;
import com.withSchool.repository.classes.ClassHomeworkRepository;
import com.withSchool.repository.classes.ClassHomeworkSubmitRepository;
import com.withSchool.repository.classes.ClassRepository;
import com.withSchool.repository.file.ClassHomeworkFileRepository;
import com.withSchool.repository.file.ClassHomeworkSubmitFileRepository;
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
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClassHomeworkService {

    private final FileService fileService;
    private final UserService userService;
    private final ClassRepository classRepository;
    private final ClassHomeworkRepository classHomeworkRepository;
    private final ClassHomeworkFileRepository classHomeworkFileRepository;
    private final ClassHomeworkSubmitRepository classHomeworkSubmitRepository;
    private final ClassHomeworkSubmitFileRepository classHomeworkSubmitFileRepository;
    @Transactional
    public ResHomeworkDTO save(ReqHomeworkCreateDTO reqHomeworkCreateDTO) {

        Optional<ClassInformation> classInformation = classRepository.findById(reqHomeworkCreateDTO.getId());

        if(classInformation.isPresent()) {
            ClassHomework classHomework = ClassHomework.builder()
                    .title(reqHomeworkCreateDTO.getTitle())
                    .content(reqHomeworkCreateDTO.getContent())
                    .homeworkDue(reqHomeworkCreateDTO.getDue())
                    .classInformation(classInformation.get())
                    .build();

            ClassHomework result = classHomeworkRepository.save(classHomework);

            List<MultipartFile> files = reqHomeworkCreateDTO.getFiles();
            for(MultipartFile s : files){
                if(!s.isEmpty()) {
                    FileDTO fileDTO = FileDTO.builder()
                            .file(s)
                            .repoType("classHomework")
                            .masterId(result.getClassHomeworkId())
                            .build();
                    fileService.saveFile(fileDTO);
                }
            }
            return ResHomeworkDTO.builder()
                    .id(result.getClassHomeworkId())
                    .title(result.getTitle())
                    .content(result.getContent())
                    .due(result.getHomeworkDue())
                    .build();
        }
        else{
            throw new NoSuchElementException("there's no class");
        }
    }

    public ResHomeworkDTO update(Long homeworkId, ReqHomeworkCreateDTO req) {

        Optional<ClassHomework> originalClassHomework = classHomeworkRepository.findById(homeworkId);


        if (originalClassHomework.isPresent()) {

            String title = req.getTitle();
            String content = req.getContent();
            LocalDateTime due = req.getDue();

            ClassHomework result = ClassHomework.builder()
                    .classHomeworkId(homeworkId)
                    .title(title)
                    .content(content)
                    .homeworkDue(due)
                    .classInformation(originalClassHomework.get().getClassInformation())
                    .build();

            ClassHomework classHomework = classHomeworkRepository.save(result);

            // 여기에 해당 공지사항의 S3파일삭제 + db에 정보 삭제
            this.deleteFileById(homeworkId);
            //ClientSchoolNoticeDTO의 파일 저장
            List<MultipartFile> dtoFile = req.getFiles();
            for(MultipartFile s : dtoFile){
                if(!s.isEmpty()){
                    FileDTO fileDTO = FileDTO.builder()
                            .repoType("classHomework")
                            .file(s)
                            .masterId(homeworkId)
                            .build();
                    fileService.saveFile(fileDTO);
                }
            }

            return ResHomeworkDTO.builder()
                    .id(classHomework.getClassHomeworkId())
                    .title(classHomework.getTitle())
                    .content(classHomework.getContent())
                    .due(classHomework.getHomeworkDue())
                    .build();
        }

        return null;
    }
    public List<ResHomeworkDTO> getList(Long classId) {
        List<ResHomeworkDTO> homeworkDTOList = new ArrayList<>();
        List<ClassHomework> classHomeworkList = classHomeworkRepository.findAlLByClassId(classId);

        for(ClassHomework c : classHomeworkList){
            Optional<List<ClassHomeworkFile>> classHomeworkFiles = classHomeworkFileRepository.findByClassHomeworkId(c.getClassHomeworkId());
            List<String> filesUrl = new ArrayList<>();
            List<String> originalName = new ArrayList<>();
            if(classHomeworkFiles.isPresent()) {
                for (ClassHomeworkFile file : classHomeworkFiles.get()) {
                    filesUrl.add(file.getFileUrl());
                    originalName.add(file.getOriginalName());
                }
            }
            ResHomeworkDTO resHomeworkDTO = ResHomeworkDTO.builder()
                    .id(c.getClassHomeworkId())
                    .title(c.getTitle())
                    .content(c.getContent())
                    .due(c.getHomeworkDue())
                    .filesURl(filesUrl)
                    .originalName(originalName)
                    .build();
            homeworkDTOList.add(resHomeworkDTO);
        }
        return homeworkDTOList;
    }

    public void delete(Long homeworkId) {
        this.deleteFileById(homeworkId);
        classHomeworkRepository.deleteById(homeworkId);
    }
    public void deleteFileById(Long homeworkId){
        Optional<List<ClassHomeworkFile>> fileList = classHomeworkFileRepository.findByClassHomeworkId(homeworkId);
        if(fileList.isPresent()){
            for(ClassHomeworkFile files : fileList.get()){
                FileDeleteDTO dto = FileDeleteDTO.builder()
                        .originalName(files.getOriginalName())
                        .repoType("classHomework")
                        .masterId(homeworkId)
                        .build();
                fileService.deleteFile(dto);
            }
        }
    }

    public String submit(ReqHomeworkSubmitDTO reqHomeworkSubmitDTO) throws Exception {
        User student = userService.getCurrentUser();

        Optional<ClassHomework> classHomework = classHomeworkRepository.findById(reqHomeworkSubmitDTO.getHomeworkId());
        if(classHomework.isEmpty()){
            throw new Exception("Homework not found with id");
        }
        Optional<ClassHomeworkSubmit> exist = classHomeworkSubmitRepository.findByUserIdHomeworkId(student.getUserId(), reqHomeworkSubmitDTO.getHomeworkId());
        if(exist.isPresent()){
            throw new Exception("submit homework already exist");
        }
        ClassHomeworkSubmit classHomeworkSubmit = ClassHomeworkSubmit.builder()
                .submitContent(reqHomeworkSubmitDTO.getContent())
                .classHomework(classHomework.get())
                .student(student)
                .build();
        ClassHomeworkSubmit result = classHomeworkSubmitRepository.save(classHomeworkSubmit);

        List<MultipartFile> files = reqHomeworkSubmitDTO.getFiles();
        for(MultipartFile s : files){
            if(!s.isEmpty()) {
                FileDTO fileDTO = FileDTO.builder()
                        .file(s)
                        .repoType("classHomeworkSubmit")
                        .masterId(result.getClassHomeworkSubmitId())
                        .build();
                fileService.saveFile(fileDTO);
            }
        }
        return "Homework submitted successfully.";
    }

    public String updateSubmit(Long classHomeworkSubmitId, ReqHomeworkSubmitDTO reqHomeworkSubmitDTO) throws Exception {
        User user = userService.getCurrentUser();
        Optional<ClassHomeworkSubmit> classHomeworkSubmit = classHomeworkSubmitRepository.findById(classHomeworkSubmitId);
        if(classHomeworkSubmit.isEmpty()){
            throw new Exception("HomeworkSubmit not found with id");
        }
        ClassHomeworkSubmit updateClassHomeworkSubmit =ClassHomeworkSubmit.builder()
                .classHomeworkSubmitId(classHomeworkSubmitId)
                .submitContent(reqHomeworkSubmitDTO.getContent())
                .student(user)
                .classHomework(classHomeworkSubmit.get().getClassHomework())
                .build();
        classHomeworkSubmitRepository.save(updateClassHomeworkSubmit);

        this.deleteSubmitFileById(classHomeworkSubmitId);

        List<MultipartFile> dtoFile = reqHomeworkSubmitDTO.getFiles();
        for(MultipartFile s : dtoFile){
            if(!s.isEmpty()){
                FileDTO fileDTO = FileDTO.builder()
                        .repoType("classHomeworkSubmit")
                        .file(s)
                        .masterId(classHomeworkSubmitId)
                        .build();
                fileService.saveFile(fileDTO);
            }
        }
        return "Homework update successfully.";
    }
    public Long getId(Long homeworkId) {
        User user = userService.getCurrentUser();
        Optional<ClassHomeworkSubmit> classHomeworkSubmit = classHomeworkSubmitRepository.findByUserIdHomeworkId(user.getUserId(),homeworkId);
        if(classHomeworkSubmit.isPresent()){
            return classHomeworkSubmit.get().getClassHomeworkSubmitId();
        }
        else{
            return null;
        }
    }

    public ResHomeworkSubmitDTO getOne(Long classHomeworkSubmitId) {
        Optional<ClassHomeworkSubmit> classHomeworkSubmit = classHomeworkSubmitRepository.findById(classHomeworkSubmitId);
        if(classHomeworkSubmit.isPresent()){
            Optional<List<ClassHomeworkSubmitFile>> classHomeworkSubmitFiles = classHomeworkSubmitFileRepository.findByClassHomeworkSubmitId(classHomeworkSubmitId);
            List<String> filesUrl = new ArrayList<>();
            List<String> originalName = new ArrayList<>();
            if(classHomeworkSubmitFiles.isPresent()) {
                for (ClassHomeworkSubmitFile file : classHomeworkSubmitFiles.get()) {
                    filesUrl.add(file.getFileUrl());
                    originalName.add(file.getOriginalName());
                }
            }

            return ResHomeworkSubmitDTO.builder()
                    .id(classHomeworkSubmit.get().getClassHomeworkSubmitId())
                    .content(classHomeworkSubmit.get().getSubmitContent())
                    .filesURl(filesUrl)
                    .originalName(originalName)
                    .build();
        }
        return null;
    }

    public List<ResHomeworkSubmitDTO> getAll(Long homeworkId) {
        List<ResHomeworkSubmitDTO> result = new ArrayList<>();
        Optional<List<ClassHomeworkSubmit>> classHomeworkSubmitList = classHomeworkSubmitRepository.findAllByHomeworkId(homeworkId);
        if(classHomeworkSubmitList.isPresent()){
            for(ClassHomeworkSubmit c : classHomeworkSubmitList.get()){
                Optional<List<ClassHomeworkSubmitFile>> classHomeworkSubmitFiles = classHomeworkSubmitFileRepository.findByClassHomeworkSubmitId(c.getClassHomeworkSubmitId());
                List<String> filesUrl = new ArrayList<>();
                List<String> originalName = new ArrayList<>();
                if(classHomeworkSubmitFiles.isPresent()) {
                    for (ClassHomeworkSubmitFile file : classHomeworkSubmitFiles.get()) {
                        filesUrl.add(file.getFileUrl());
                        originalName.add(file.getOriginalName());
                    }
                }
                ResHomeworkSubmitDTO resHomeworkSubmitDTO = ResHomeworkSubmitDTO.builder()
                        .id(c.getClassHomeworkSubmitId())
                        .content(c.getSubmitContent())
                        .originalName(originalName)
                        .filesURl(filesUrl)
                        .build();

                result.add(resHomeworkSubmitDTO);
            }
            return result;
        }
        return null;
    }
    public void deleteSubmit(Long homeworkSubmitId) {
        this.deleteFileById(homeworkSubmitId);
        classHomeworkSubmitRepository.deleteById(homeworkSubmitId);
    }
    public void deleteSubmitFileById(Long homeworkSubmitId){
        Optional<List<ClassHomeworkSubmitFile>> fileList = classHomeworkSubmitFileRepository.findByClassHomeworkSubmitId(homeworkSubmitId);
        if(fileList.isPresent()){
            for(ClassHomeworkSubmitFile files : fileList.get()){
                FileDeleteDTO dto = FileDeleteDTO.builder()
                        .originalName(files.getOriginalName())
                        .repoType("classHomeworkSubmit")
                        .masterId(homeworkSubmitId)
                        .build();
                fileService.deleteFile(dto);
            }
        }
    }
}
