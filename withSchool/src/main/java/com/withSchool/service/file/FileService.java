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
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
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

    private final SchoolNoticeRepository schoolNoticeRepository;
    private final ClassNoticeRepository classNoticeRepository;
    private final ClassHomeworkRepository classHomeworkRepository;
    private final ClassHomeworkSubmitRepository classHomeworkSubmitRepository;
    private final SubjectNoticeRepository subjectNoticeRepository;
    private final SubjectLectureNoteRepository subjectLectureNoteRepository;
    private final SubjectHomeworkRepository subjectHomeworkRepository;
    private final SubjectHomeworkSubmitRepository subjectHomeworkSubmitRepository;
    private final CommunityPostRepository communityPostRepository;

    @Value("${cloud.aws.credentials.bucket}")
    private String bucket;

    private String fileName;
    private String fileUrl;
    public void saveFile(FileDTO dto) {
        String repoType = dto.getRepoType();
        try {
            String fileName = createFileName(dto.getFile().getOriginalFilename());
            String fileUrl = uploadFileToS3(dto, fileName);
            saveFileMetadata(repoType, dto, fileName, fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
            e.printStackTrace();
        }
    }
    public void deleteFile(FileDeleteDTO dto){
        String repoType = dto.getRepoType();
        try{
            deleteFileMetadata(repoType,dto);
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, dto.getOriginalName()));
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
    private String uploadFileToS3(FileDTO dto, String fileName) throws IOException {
        String fileUrl = "https://kr.object.ncloudstorage.com/" + bucket + "/" + fileName;
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(dto.getFile().getContentType());
        metadata.setContentLength(dto.getFile().getSize());
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, dto.getFile().getInputStream(), metadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return fileUrl;
    }
    private void saveFileMetadata(String repoType, FileDTO dto, String fileName, String fileUrl) {
        switch (repoType) {
            case "schoolNotice":
                saveSchoolNoticeFile(dto, fileName, fileUrl);
                break;
            case "classNotice":
                saveClassNoticeFile(dto, fileName, fileUrl);
                break;
            case "classHomework":
                saveClassHomeworkFile(dto, fileName, fileUrl);
                break;
            case "classHomeworkSubmit":
                saveClassHomeworkSubmitFile(dto,fileName,fileUrl);
                break;
            case "subjectNotice":
                saveSubjectNoticeFile(dto,fileName,fileUrl);
                break;
            case "subjectHomework":
                saveSubjectHomeworkFile(dto,fileName,fileUrl);
                break;
            case "subjectHomeworkSubmit":
                saveSubjectHomeworkSubmitFile(dto,fileName,fileUrl);
                break;
            case "subjectLectureNote":
                saveSubjectLectureNoteFile(dto,fileName,fileUrl);
                break;
            case "communityPost":
                savePostFile(dto,fileName,fileUrl);
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
            default:
                throw new IllegalArgumentException("Invalid repository type: " + repoType);
        }
    }

    private void saveSchoolNoticeFile(FileDTO dto, String fileName, String fileUrl) {
        SchoolNoticeFile schoolNoticeFile = SchoolNoticeFile.builder()
                .originalName(fileName)
                .fileUrl(fileUrl)
                .schoolNotice(schoolNoticeRepository.findById(dto.getMasterId()).orElseThrow())
                .build();
        schoolNoticeFileRepository.save(schoolNoticeFile);
    }

    private void saveClassNoticeFile(FileDTO dto, String fileName, String fileUrl) {
        ClassNoticeFile classNoticeFile = ClassNoticeFile.builder()
                .originalName(fileName)
                .fileUrl(fileUrl)
                .classNotice(classNoticeRepository.findById(dto.getMasterId()).orElseThrow())
                .build();
        classNoticeFileRepository.save(classNoticeFile);
    }

    private void saveClassHomeworkFile(FileDTO dto, String fileName, String fileUrl) {
        ClassHomeworkFile classHomeworkFile = ClassHomeworkFile.builder()
                .originalName(fileName)
                .fileUrl(fileUrl)
                .classHomework(classHomeworkRepository.findById(dto.getMasterId()).orElseThrow())
                .build();
        classHomeworkFileRepository.save(classHomeworkFile);
    }
    private void saveClassHomeworkSubmitFile(FileDTO dto, String fileName, String fileUrl) {
        ClassHomeworkSubmitFile classHomeworkSubmitFile = ClassHomeworkSubmitFile.builder()
                .originalName(fileName)
                .fileUrl(fileUrl)
                .classHomeworkSubmit(classHomeworkSubmitRepository.findById(dto.getMasterId()).get())
                .build();
        classHomeworkSubmitFileRepository.save(classHomeworkSubmitFile);
    }
    private void saveSubjectNoticeFile(FileDTO dto, String fileName, String fileUrl) {
        SubjectNoticeFile subjectNoticeFile = SubjectNoticeFile.builder()
                .originalName(fileName)
                .fileUrl(fileUrl)
                .subjectNotice(subjectNoticeRepository.findById(dto.getMasterId()).get())
                .build();
        subjectNoticeFileRepository.save(subjectNoticeFile);
    }
    private void saveSubjectHomeworkFile(FileDTO dto, String fileName, String fileUrl) {
        SubjectHomeworkFile subjectHomeworkFile = SubjectHomeworkFile.builder()
                .originalName(fileName)
                .fileUrl(fileUrl)
                .subjectHomework(subjectHomeworkRepository.findById(dto.getMasterId()).get())
                .build();
        subjectHomeworkFileRepository.save(subjectHomeworkFile);
    }
    private void saveSubjectHomeworkSubmitFile(FileDTO dto, String fileName, String fileUrl) {
        SubjectHomeworkSubmitFile subjectHomeworkSubmitFile = SubjectHomeworkSubmitFile.builder()
                .originalName(fileName)
                .fileUrl(fileUrl)
                .subjectHomeworkSubmit(subjectHomeworkSubmitRepository.findById(dto.getMasterId()).get())
                .build();
        subjectHomeworkSubmitFileRepository.save(subjectHomeworkSubmitFile);
    }
    private void saveSubjectLectureNoteFile(FileDTO dto, String fileName, String fileUrl) {
        SubjectLectureNoteFile subjectLectureNoteFile = SubjectLectureNoteFile.builder()
                .originalName(fileName)
                .fileUrl(fileUrl)
                .subjectLectureNote(subjectLectureNoteRepository.findById(dto.getMasterId()).get())
                .build();
        subjectLectureNoteFileRepository.save(subjectLectureNoteFile);
    }
    private void savePostFile(FileDTO dto, String fileName, String fileUrl) {
        PostFile postFile = PostFile.builder()
                .originalName(fileName)
                .fileUrl(fileUrl)
                .post(communityPostRepository.findById(dto.getMasterId()).get())
                .build();
        communityPostFileRepository.save(postFile);
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

    public void deleteSubjectLectureNoteFile(FileDeleteDTO dto) {
        subjectLectureNoteFileRepository.deleteAllBySubjectLectureNoteId(dto.getMasterId());
    }

    public void deletePostFile(FileDeleteDTO dto) {
        communityPostFileRepository.deleteAllByPostFileId(dto.getMasterId());
    }
    public String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }
    public void deleteSubjectLectureNoteFile(FileDeleteDTO dto) {
        String repoType = dto.getRepoType();
        try {
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, dto.getOriginalName()));
            subjectLectureNoteFileRepository.deleteAllBySubjectLectureNoteId(dto.getMasterId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
