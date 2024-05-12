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

import java.io.IOException;

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
    public void saveFile(FileDTO dto){
        String repoType = dto.getRepoType();
        try {
            fileName = dto.getFile().getOriginalFilename();
            fileUrl = "https://kr.object.ncloudstorage.com/" + bucket + "/" + fileName;
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(dto.getFile().getContentType());
            metadata.setContentLength(dto.getFile().getSize());
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, dto.getFile().getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        }
        catch (IOException e) {
            e.printStackTrace();
        }

        if(repoType.equals("schoolNotice")){
            try {
                SchoolNoticeFile schoolNoticeFile = SchoolNoticeFile.builder()
                        .originalName(fileName)
                        .fileUrl(fileUrl)
                        .schoolNotice(schoolNoticeRepository.findById(dto.getMasterId()).get())
                        .build();
                schoolNoticeFileRepository.save(schoolNoticeFile);
            } catch (Exception e) {
                amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
                e.printStackTrace();
            }
        }

        else if(repoType.equals("classNotice")){
            try {
                ClassNoticeFile classNoticeFile = ClassNoticeFile.builder()
                        .originalName(fileName)
                        .fileUrl(fileUrl)
                        .classNotice(classNoticeRepository.findById(dto.getMasterId()).get())
                        .build();
                classNoticeFileRepository.save(classNoticeFile);
            } catch (Exception e) {
                amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
                e.printStackTrace();
            }
        }
        else if(repoType.equals("classHomework")){
            try {
                ClassHomeworkFile classHomeworkFile = ClassHomeworkFile.builder()
                        .originalName(fileName)
                        .fileUrl(fileUrl)
                        .classHomework(classHomeworkRepository.findById(dto.getMasterId()).get())
                        .build();
                classHomeworkFileRepository.save(classHomeworkFile);
            } catch (Exception e) {
                amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
                e.printStackTrace();
            }
        }
        else if(repoType.equals("classHomeworkSubmit")){
            try {
                ClassHomeworkSubmitFile classHomeworkSubmitFile = ClassHomeworkSubmitFile.builder()
                        .originalName(fileName)
                        .fileUrl(fileUrl)
                        .classHomeworkSubmit(classHomeworkSubmitRepository.findById(dto.getMasterId()).get())
                        .build();
                classHomeworkSubmitFileRepository.save(classHomeworkSubmitFile);
            } catch (Exception e) {
                amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
                e.printStackTrace();
            }
        }
        else if(repoType.equals("subjectNotice")){
            try {
                SubjectNoticeFile subjectNoticeFile = SubjectNoticeFile.builder()
                        .originalName(fileName)
                        .fileUrl(fileUrl)
                        .subjectNotice(subjectNoticeRepository.findById(dto.getMasterId()).get())
                        .build();
                subjectNoticeFileRepository.save(subjectNoticeFile);
            } catch (Exception e) {
                amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
                e.printStackTrace();
            }
        }
        else if(repoType.equals("subjectHomework")){
            try {
                SubjectHomeworkFile subjectHomeworkFile = SubjectHomeworkFile.builder()
                        .originalName(fileName)
                        .fileUrl(fileUrl)
                        .subjectHomework(subjectHomeworkRepository.findById(dto.getMasterId()).get())
                        .build();
                subjectHomeworkFileRepository.save(subjectHomeworkFile);
            } catch (Exception e) {
                amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
                e.printStackTrace();
            }
        }
        else if(repoType.equals("subjectHomeworkSubmit")){
            try {
                SubjectHomeworkSubmitFile subjectHomeworkSubmitFile = SubjectHomeworkSubmitFile.builder()
                        .originalName(fileName)
                        .fileUrl(fileUrl)
                        .subjectHomeworkSubmit(subjectHomeworkSubmitRepository.findById(dto.getMasterId()).get())
                        .build();
                subjectHomeworkSubmitFileRepository.save(subjectHomeworkSubmitFile);
            } catch (Exception e) {
                amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
                e.printStackTrace();
            }
        }
        else if(repoType.equals("subjectLectureNote")){
            try {
                SubjectLectureNoteFile subjectLectureNoteFile = SubjectLectureNoteFile.builder()
                        .originalName(fileName)
                        .fileUrl(fileUrl)
                        .subjectLectureNote(subjectLectureNoteRepository.findById(dto.getMasterId()).get())
                        .build();
                subjectLectureNoteFileRepository.save(subjectLectureNoteFile);
            } catch (Exception e) {
                amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
                e.printStackTrace();
            }
        }
        else if(repoType.equals("CommunityPost")){
            try {
                PostFile postFile = PostFile.builder()
                        .originalName(fileName)
                        .fileUrl(fileUrl)
                        .post(communityPostRepository.findById(dto.getMasterId()).get())
                        .build();
                communityPostFileRepository.save(postFile);
            } catch (Exception e) {
                amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
                e.printStackTrace();
            }
        }
    }
    public void deleteSchoolNoticeFile(FileDeleteDTO dto){
        try {
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, dto.getOriginalName()));
            schoolNoticeFileRepository.deleteAllBySchoolNoticeId(dto.getMasterId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
