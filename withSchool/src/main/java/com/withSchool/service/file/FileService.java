package com.withSchool.service.file;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.entity.classes.ClassHomeworkFile;
import com.withSchool.entity.classes.ClassHomeworkSubmitFile;
import com.withSchool.entity.classes.ClassNoticeFile;
import com.withSchool.entity.community.PostFile;
import com.withSchool.entity.school.SchoolNoticeFile;
import com.withSchool.entity.subject.SubjectHomeworkFile;
import com.withSchool.entity.subject.SubjectHomeworkSubmitFile;
import com.withSchool.entity.subject.SubjectLectureNoteFile;
import com.withSchool.entity.subject.SubjectNoticeFile;
import com.withSchool.entity.user.ProjectTaskFile;
import com.withSchool.repository.classes.ClassHomeworkRepository;
import com.withSchool.repository.classes.ClassHomeworkSubmitRepository;
import com.withSchool.repository.classes.ClassNoticeRepository;
import com.withSchool.repository.community.CommunityPostRepository;
import com.withSchool.repository.file.*;
import com.withSchool.repository.school.SchoolNoticeRepository;
import com.withSchool.repository.subject.SubjectHomeworkRepository;
import com.withSchool.repository.subject.SubjectHomeworkSubmitRepository;
import com.withSchool.repository.subject.SubjectLectureNoteRepository;
import com.withSchool.repository.subject.SubjectNoticeRepository;
import com.withSchool.repository.user.ProjectTaskFileRepository;
import com.withSchool.repository.user.ProjectTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.UUID;

import static com.google.common.io.Files.getFileExtension;

@Service
@RequiredArgsConstructor
public class FileService {

    private final AmazonS3 amazonS3;

    private final SchoolNoticeFileRepository schoolNoticeFileRepository;
    private final ClassNoticeFileRepository classNoticeFileRepository;
    private final ClassHomeworkFileRepository classHomeworkFileRepository;
    private final ClassHomeworkSubmitFileRepository classHomeworkSubmitFileRepository;
    private final SubjectNoticeFileRepository subjectNoticeFileRepository;
    private final SubjectLectureNoteFileRepository subjectLectureNoteFileRepository;
    private final SubjectHomeworkFileRepository subjectHomeworkFileRepository;
    private final SubjectHomeworkSubmitFileRepository subjectHomeworkSubmitFileRepository;
    private final CommunityPostFileRepository communityPostFileRepository;
    private final ProjectTaskRepository projectTaskRepository;

    private final SchoolNoticeRepository schoolNoticeRepository;
    private final ClassNoticeRepository classNoticeRepository;
    private final ClassHomeworkRepository classHomeworkRepository;
    private final ClassHomeworkSubmitRepository classHomeworkSubmitRepository;
    private final SubjectNoticeRepository subjectNoticeRepository;
    private final SubjectLectureNoteRepository subjectLectureNoteRepository;
    private final SubjectHomeworkRepository subjectHomeworkRepository;
    private final SubjectHomeworkSubmitRepository subjectHomeworkSubmitRepository;
    private final CommunityPostRepository communityPostRepository;
    private final ProjectTaskFileRepository projectTaskFileRepository;

    @Value("${cloud.aws.credentials.bucket}")
    private String bucket;

    private String savedName;
    private String fileUrl;
    public void saveFile(FileDTO dto) {
        String repoType = dto.getRepoType();
        try {
            String originalName = dto.getFile().getOriginalFilename();
            savedName = createFileName(originalName);
            fileUrl = uploadFileToS3(dto, savedName);
            saveFileMetadata(repoType, dto, originalName,savedName, fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, savedName));
            e.printStackTrace();
        }
    }
    public void deleteFile(FileDeleteDTO dto){
        String repoType = dto.getRepoType();
        try{
            deleteFileMetadata(repoType,dto);
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, dto.getSavedName()));
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
    private String uploadFileToS3(FileDTO dto, String savedName) throws IOException {
        String fileUrl = "https://kr.object.ncloudstorage.com/" + bucket + "/" + savedName;
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(dto.getFile().getContentType());
        metadata.setContentLength(dto.getFile().getSize());
        amazonS3.putObject(new PutObjectRequest(bucket, savedName, dto.getFile().getInputStream(), metadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return fileUrl;
    }
    private void saveFileMetadata(String repoType, FileDTO dto, String originalName, String savedName, String fileUrl) {
        switch (repoType) {
            case "schoolNotice":
                saveSchoolNoticeFile(dto, originalName, savedName, fileUrl);
                break;
            case "classNotice":
                saveClassNoticeFile(dto, originalName, savedName, fileUrl);
                break;
            case "classHomework":
                saveClassHomeworkFile(dto, originalName, savedName, fileUrl);
                break;
            case "classHomeworkSubmit":
                saveClassHomeworkSubmitFile(dto, originalName, savedName, fileUrl);
                break;
            case "subjectNotice":
                saveSubjectNoticeFile(dto, originalName, savedName, fileUrl);
                break;
            case "subjectHomework":
                saveSubjectHomeworkFile(dto, originalName, savedName, fileUrl);
                break;
            case "subjectHomeworkSubmit":
                saveSubjectHomeworkSubmitFile(dto, originalName, savedName, fileUrl);
                break;
            case "subjectLectureNote":
                saveSubjectLectureNoteFile(dto, originalName, savedName, fileUrl);
                break;
            case "communityPost":
                savePostFile(dto, originalName, savedName, fileUrl);
                break;
            case "kanban":
                saveTaskFile(dto,originalName,savedName,fileUrl);
                break;
            default:
                throw new IllegalArgumentException("Invalid repository type: " + repoType);
        }
    }


    private void deleteFileMetadata(String repoType, FileDeleteDTO dto) {
        switch (repoType) {
            case "schoolNotice":
                deleteSchoolNoticeFile(dto);
                break;
            case "classNotice":
                deleteClassNoticeFile(dto);
                break;
            case "classHomework":
                deleteClassHomeworkFile(dto);
                break;
            case "classHomeworkSubmit":
                deleteClassHomeworkSubmitFile(dto);
                break;
            case "subjectNotice":
                deleteSubjectNoticeFile(dto);
                break;
            case "subjectHomework":
                deleteSubjectHomeworkFile(dto);
                break;
            case "subjectHomeworkSubmit":
                deleteSubjectHomeworkSubmitFile(dto);
                break;
            case "subjectLectureNote":
                deleteSubjectLectureNoteFile(dto);
                break;
            case "communityPost":
                deletePostFile(dto);
                break;
            case "kanban":
                deleteTaskFile(dto);
                break;
            default:
                throw new IllegalArgumentException("Invalid repository type: " + repoType);
        }
    }


    private void saveSchoolNoticeFile(FileDTO dto,String originalName, String savedName, String fileUrl) {
        SchoolNoticeFile schoolNoticeFile = SchoolNoticeFile.builder()
                .originalName(originalName)
                .savedName(savedName)
                .fileUrl(fileUrl)
                .schoolNotice(schoolNoticeRepository.findById(dto.getMasterId()).orElseThrow())
                .build();
        schoolNoticeFileRepository.save(schoolNoticeFile);
    }

    private void saveClassNoticeFile(FileDTO dto,String originalName, String savedName, String fileUrl) {
        ClassNoticeFile classNoticeFile = ClassNoticeFile.builder()
                .originalName(originalName)
                .savedName(savedName)
                .fileUrl(fileUrl)
                .classNotice(classNoticeRepository.findById(dto.getMasterId()).orElseThrow())
                .build();
        classNoticeFileRepository.save(classNoticeFile);
    }

    private void saveClassHomeworkFile(FileDTO dto,String originalName, String savedName, String fileUrl) {
        ClassHomeworkFile classHomeworkFile = ClassHomeworkFile.builder()
                .originalName(originalName)
                .savedName(savedName)
                .fileUrl(fileUrl)
                .classHomework(classHomeworkRepository.findById(dto.getMasterId()).orElseThrow())
                .build();
        classHomeworkFileRepository.save(classHomeworkFile);
    }
    private void saveClassHomeworkSubmitFile(FileDTO dto,String originalName, String savedName, String fileUrl) {
        ClassHomeworkSubmitFile classHomeworkSubmitFile = ClassHomeworkSubmitFile.builder()
                .originalName(originalName)
                .savedName(savedName)
                .fileUrl(fileUrl)
                .classHomeworkSubmit(classHomeworkSubmitRepository.findById(dto.getMasterId()).get())
                .build();
        classHomeworkSubmitFileRepository.save(classHomeworkSubmitFile);
    }
    private void saveSubjectNoticeFile(FileDTO dto,String originalName, String savedName, String fileUrl) {
        SubjectNoticeFile subjectNoticeFile = SubjectNoticeFile.builder()
                .originalName(originalName)
                .savedName(savedName)
                .fileUrl(fileUrl)
                .subjectNotice(subjectNoticeRepository.findById(dto.getMasterId()).get())
                .build();
        subjectNoticeFileRepository.save(subjectNoticeFile);
    }
    private void saveSubjectHomeworkFile(FileDTO dto,String originalName, String savedName, String fileUrl) {
        SubjectHomeworkFile subjectHomeworkFile = SubjectHomeworkFile.builder()
                .originalName(originalName)
                .savedName(savedName)
                .fileUrl(fileUrl)
                .subjectHomework(subjectHomeworkRepository.findById(dto.getMasterId()).get())
                .build();
        subjectHomeworkFileRepository.save(subjectHomeworkFile);
    }
    private void saveSubjectHomeworkSubmitFile(FileDTO dto,String originalName, String savedName, String fileUrl) {
        SubjectHomeworkSubmitFile subjectHomeworkSubmitFile = SubjectHomeworkSubmitFile.builder()
                .originalName(originalName)
                .savedName(savedName)
                .fileUrl(fileUrl)
                .subjectHomeworkSubmit(subjectHomeworkSubmitRepository.findById(dto.getMasterId()).get())
                .build();
        subjectHomeworkSubmitFileRepository.save(subjectHomeworkSubmitFile);
    }
    private void saveSubjectLectureNoteFile(FileDTO dto,String originalName, String savedName, String fileUrl) {
        SubjectLectureNoteFile subjectLectureNoteFile = SubjectLectureNoteFile.builder()
                .originalName(originalName)
                .savedName(savedName)
                .fileUrl(fileUrl)
                .subjectLectureNote(subjectLectureNoteRepository.findById(dto.getMasterId()).get())
                .build();
        subjectLectureNoteFileRepository.save(subjectLectureNoteFile);
    }
    private void savePostFile(FileDTO dto,String originalName, String savedName, String fileUrl) {
        PostFile postFile = PostFile.builder()
                .originalName(originalName)
                .savedName(savedName)
                .fileUrl(fileUrl)
                .post(communityPostRepository.findById(dto.getMasterId()).get())
                .build();
        communityPostFileRepository.save(postFile);
    }
    private void saveTaskFile(FileDTO dto, String originalName, String savedName, String fileUrl) {
        ProjectTaskFile projectTaskFile = ProjectTaskFile.builder()
                .originalName(originalName)
                .savedName(savedName)
                .fileUrl(fileUrl)
                .projectTask(projectTaskRepository.findById(dto.getMasterId()).get())
                .build();
        projectTaskFileRepository.save(projectTaskFile);
    }
    public void deleteSchoolNoticeFile(FileDeleteDTO dto) {
        schoolNoticeFileRepository.deleteAllBySchoolNoticeId(dto.getMasterId());
    }

    public void deleteClassNoticeFile(FileDeleteDTO dto) {
        classNoticeFileRepository.deleteAllByClassNoticeId(dto.getMasterId());
    }

    public void deleteClassHomeworkFile(FileDeleteDTO dto) {
        classHomeworkFileRepository.deleteAllByClassHomeworkId(dto.getMasterId());
    }

    public void deleteClassHomeworkSubmitFile(FileDeleteDTO dto) {
        classHomeworkSubmitFileRepository.deleteAllByClassHomeworkSubmitFileId(dto.getMasterId());
    }

    public void deleteSubjectNoticeFile(FileDeleteDTO dto) {
        subjectNoticeFileRepository.deleteAllBySubjectNoticeId(dto.getMasterId());
    }

    public void deleteSubjectHomeworkFile(FileDeleteDTO dto) {
        subjectHomeworkFileRepository.deleteAllBySubjectHomeworkId(dto.getMasterId());
    }

    public void deleteSubjectHomeworkSubmitFile(FileDeleteDTO dto) {
        subjectHomeworkSubmitFileRepository.deleteAllBySubjectHomeworkSubmitId(dto.getMasterId());
    }

    public void deletePostFile(FileDeleteDTO dto) {
        communityPostFileRepository.deleteAllByPostId(dto.getMasterId());
    }
    private void deleteTaskFile(FileDeleteDTO dto) {
        projectTaskFileRepository.deleteAllByProjectTaskId(dto.getMasterId());
    }
    public String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }
    public void deleteSubjectLectureNoteFile(FileDeleteDTO dto) {
        String repoType = dto.getRepoType();
        try {
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, dto.getSavedName()));
            subjectLectureNoteFileRepository.deleteAllBySubjectLectureNoteId(dto.getMasterId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
