package com.withSchool.service.classes;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.subject.ReqHomeworkCreateDTO;
import com.withSchool.dto.subject.ResHomeworkDTO;
import com.withSchool.entity.classes.ClassHomework;
import com.withSchool.entity.classes.ClassHomeworkFile;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.repository.classes.ClassHomeworkRepository;
import com.withSchool.repository.classes.ClassRepository;
import com.withSchool.repository.file.ClassHomeworkFileRepository;
import com.withSchool.service.file.FileService;
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
    private final ClassRepository classRepository;
    private final ClassHomeworkRepository classHomeworkRepository;
    private final ClassHomeworkFileRepository classHomeworkFileRepository;
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
}
