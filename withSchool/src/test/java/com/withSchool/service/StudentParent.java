package com.withSchool.service;

import com.google.gson.Gson;
import com.withSchool.dto.school.SchoolInformationDTO;
import com.withSchool.dto.subject.SubjectInfoDTO;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.mapping.StudentParentService;
import com.withSchool.service.mapping.StudentSubjectService;
import com.withSchool.service.school.SchoolInformationService;
import com.withSchool.service.subject.SubjectService;
import com.withSchool.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class StudentParent {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentSubjectService studentSubjectService;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SchoolInformationService schoolInformationService;

    @Autowired
    private StudentParentService studentParentService;

    @Autowired
    private SubjectService subjectService;

    @BeforeEach
    public void 테스트_데이터_추가() {

        String json = """
                {
                                    "ATPT_OFCDC_SC_CODE": "B10",
                                    "ATPT_OFCDC_SC_NM": "서울특별시교육청",
                                    "SD_SCHUL_CODE": "7130166",
                                    "SCHUL_NM": "가원중학교",
                                    "ENG_SCHUL_NM": "Gawon Middle School",
                                    "SCHUL_KND_SC_NM": "중학교",
                                    "LCTN_SC_NM": "서울특별시",
                                    "JU_ORG_NM": "서울특별시강동송파교육지원청",
                                    "FOND_SC_NM": "공립",
                                    "ORG_RDNZC": "05831 ",
                                    "ORG_RDNMA": "서울특별시 송파구 중대로10길 40-18",
                                    "ORG_RDNDA": "(가락동/가원중학교)",
                                    "ORG_TELNO": "02-409-2179",
                                    "HMPG_ADRES": "www.gawon.ms.kr",
                                    "COEDU_SC_NM": "남여공학",
                                    "ORG_FAXNO": "02-443-5825",
                                    "HS_SC_NM": "  ",
                                    "INDST_SPECL_CCCCL_EXST_YN": "N",
                                    "HS_GNRL_BUSNS_SC_NM": "일반계",
                                    "SPCLY_PURPS_HS_ORD_NM": null,
                                    "ENE_BFE_SEHF_SC_NM": "전기",
                                    "DGHT_SC_NM": "주간",
                                    "FOND_YMD": "19881224",
                                    "FOAS_MEMRD": "19881224",
                                    "LOAD_DTM": "20230615"
                                }""";
        Gson gson = new Gson();
        SchoolInformationDTO schoolInformationDTO = gson.fromJson(json, SchoolInformationDTO.class);
        SchoolInformation schoolInformation = schoolInformationService.dtoToEntity(schoolInformationDTO);

        SchoolInformation savedSchool = schoolInformationService.save(schoolInformation);

        System.out.println(
                """
                                                
                        학교 등록 완료
                                                
                        """);

        Subject subject = Subject.builder()
                .subjectName("수학")
                .schoolInformation(savedSchool)
                .build();

        subjectRepository.save(subject);
        System.out.println(
                """
                                                
                        수업 등록 완료
                                                
                        """);


        for (int i = 0; i < 5; i++) {
            User user = User.builder()
                    .id("parent" + i)
                    .email("example" + i + "@example.com")
                    .password(passwordEncoder.encode("dd1"))
                    .name("parent" + i)
                    .sex(true)
                    .phoneNumber("123-456-78" + i)
                    .address("123 Street, City, Country")
                    .birthDate(LocalDateTime.of(1990, 5, 15, 0, 0)) // Example birth date
                    .accountType(i)
                    .userCode("user123" + i)
                    .parentCode("parent456" + i)
                    .schoolInformation(savedSchool)
                    .build();

            userRepository.save(user);

            if (user.getAccountType() == 0 || user.getAccountType() == 2)
                studentSubjectService.register(user, subject);
        }

        System.out.println(
                """
                                                
                        유저 등록 완료
                                                
                        학생, 교사 수업 매핑 완료
                                                
                        """);

        User child = userService.findById("parent0");
        User parent = userService.findById("parent1");

        studentParentService.mapping(child, parent);

        System.out.println(
                """
                                                
                        학생, 부모 매핑 완료
                                                
                        """);

    }


    @Test
    public void 학부모의_학생_수강목록_확인() {
        User parent = userService.findById("parent1");

        List<SubjectInfoDTO> subjects = subjectService.findChildSubjects(parent);

        for (SubjectInfoDTO s : subjects) {
            System.out.println(s);
        }


    }
}
