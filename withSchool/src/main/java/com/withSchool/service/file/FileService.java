package com.withSchool.service.file;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.withSchool.dto.file.FileDTO;
import com.withSchool.entity.school.SchoolNoticeFile;
import com.withSchool.repository.file.NoticeFileRepository;
import com.withSchool.repository.school.SchoolNoticeRepository;
import com.withSchool.service.school.SchoolNoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FileService {

    private final AmazonS3Client amazonS3Client;
    private final NoticeFileRepository noticeFileRepository;
    private final SchoolNoticeRepository schoolNoticeRepository;

    @Value("${cloud.aws.credentials.bucket}")
    private String bucket;
    public void saveFile(FileDTO dto){
        try {
            String fileName = dto.getFile().getOriginalFilename();
            String fileUrl = "https://kr.object.ncloudstorage.com/" +  bucket + "/" +  fileName;
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(dto.getFile().getContentType());
            metadata.setContentLength(dto.getFile().getSize());
            amazonS3Client.putObject(bucket,fileName,dto.getFile().getInputStream(),metadata);


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
}
