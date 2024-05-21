package com.withSchool.service.subject;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.subject.ReqHomeworkCreateDTO;
import com.withSchool.dto.subject.ResHomeworkDTO;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.subject.SubjectHomework;
import com.withSchool.entity.subject.SubjectHomeworkFile;
import com.withSchool.repository.file.SubjectHomeworkFileRepository;
import com.withSchool.repository.subject.SubjectHomeworkRepository;
import com.withSchool.repository.subject.SubjectRepository;
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
public class SubjectHomeworkService {
    private final SubjectHomeworkRepository subjectHomeworkRepository;
    private final SubjectHomeworkFileRepository subjectHomeworkFileRepository;
    private final SubjectRepository subjectRepository;
    private final FileService fileService;
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
                        .originalName(files.getOriginalName())
                        .repoType("subjectHomework")
                        .masterId(homeworkId)
                        .build();
                fileService.deleteFile(dto);
            }
        }
    }
}
