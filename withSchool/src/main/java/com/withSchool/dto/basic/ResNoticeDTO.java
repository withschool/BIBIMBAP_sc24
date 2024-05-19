package com.withSchool.dto.basic;

import com.withSchool.dto.user.ResUserDefaultDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Data
@ToString
<<<<<<< HEAD:withSchool/src/main/java/com/withSchool/dto/basic/ResNoticeDTO.java
public class ResNoticeDTO {
    String title;
    String content;
    String user;
    LocalDateTime regDate;
    List<String> filesURl;
    List<String> originalName;
=======
public class ResSchoolNoticeDTO {
    private Long schoolNoticeId;
    private String title;
    private String content;
    private ResUserDefaultDTO user;
    private LocalDateTime regDate;
    private List<String> filesURl;
    private List<String> originalName;
>>>>>>> a501b6c6ad700d1c4fa5b854317cbaed1e12f56b:withSchool/src/main/java/com/withSchool/dto/school/ResSchoolNoticeDTO.java
}
