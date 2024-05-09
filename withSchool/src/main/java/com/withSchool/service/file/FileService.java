package com.withSchool.service.file;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.entity.school.SchoolNoticeFile;
import com.withSchool.repository.file.NoticeFileRepository;
import com.withSchool.repository.school.SchoolNoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FileService {

    private final AmazonS3 amazonS3;
    private final NoticeFileRepository noticeFileRepository;
    private final SchoolNoticeRepository schoolNoticeRepository;

    @Value("${cloud.aws.credentials.bucket}")
    private String bucket;
    public void saveSchoolNoticeFile(FileDTO dto){
        try {
            String fileName = dto.getFile().getOriginalFilename();
            String fileUrl = "https://kr.object.ncloudstorage.com/" +  bucket + "/" +  fileName;
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(dto.getFile().getContentType());
            metadata.setContentLength(dto.getFile().getSize());
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, dto.getFile().getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));


            SchoolNoticeFile schoolNoticeFile = SchoolNoticeFile.builder()
                    .originalName(fileName)
                    .fileUrl(fileUrl)
                    .schoolNotice(schoolNoticeRepository.findById(dto.getMasterId()).get())
                    .build();
            noticeFileRepository.save(schoolNoticeFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public void deleteSchoolNoticeFile(FileDeleteDTO dto){
        try {
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, dto.getFileUrl()));
            noticeFileRepository.deleteById(dto.getMasterId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
