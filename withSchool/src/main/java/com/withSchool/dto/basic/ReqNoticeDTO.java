package com.withSchool.dto.basic;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Data
@Getter
@ToString
<<<<<<< HEAD:withSchool/src/main/java/com/withSchool/dto/basic/ReqNoticeDTO.java
public class ReqNoticeDTO {
    String title;
    String content;
    List<MultipartFile> file;
=======
public class ReqSchoolNoticeDTO {
    private String title;
    private String content;
    private List<MultipartFile> file;
>>>>>>> a501b6c6ad700d1c4fa5b854317cbaed1e12f56b:withSchool/src/main/java/com/withSchool/dto/school/ReqSchoolNoticeDTO.java
}
