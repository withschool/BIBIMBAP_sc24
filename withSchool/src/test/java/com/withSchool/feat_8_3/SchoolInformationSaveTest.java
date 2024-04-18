package com.withSchool.feat_8_3;

import com.google.gson.Gson;
import com.withSchool.DTO.SchoolInformationDTO;
import com.withSchool.entity.SchoolInformation;
import com.withSchool.repository.SchoolInformationRepository;
import com.withSchool.service.SchoolInformationService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class SchoolInformationSaveTest {
    @Autowired
    private SchoolInformationService schoolInformationService;

    @Autowired
    private SchoolInformationRepository schoolInformationRepository;

    @Test
    public void findDuplicateSchool(){
        if(schoolInformationService.isDuplicateSchool("B10", "7130166")){
            System.out.println("This school is present");
        }
        else {
            System.out.println("This school is not present");
        }
        if(schoolInformationService.isDuplicateSchool("B11", "7130166")){
            System.out.println("This school is present");
        }
        else {
            System.out.println("This school is not present");
        }
    }

    @AfterEach
    public void clean(){
        schoolInformationRepository.deleteAll();
    }

    @Test
    public void saveSchool(){

        System.out.println("""

                // 첫 번째 학교 입력 테스트
                        // 예상 결과: 가원중학교""");
        // 첫 번째 학교 입력 테스트
        // 예상 결과: 가원중학교
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
        if(savedSchool == null){
            System.out.println("school is already present");
        }
        else{
            System.out.println(savedSchool.getSchulNm());
        }

        System.out.println("""

                        // 첫 번째 학교 중복 입력 테스트
                        // 예상 결과 : school is already present\
                """);
        // 첫 번째 학교 중복 입력 테스트
        // 예상 결과 : school is already present
        schoolInformationDTO = gson.fromJson(json, SchoolInformationDTO.class);
        schoolInformation = schoolInformationService.dtoToEntity(schoolInformationDTO);

        savedSchool = schoolInformationService.save(schoolInformation);
        if(savedSchool == null){
            System.out.println("school is already present");
        }
        else{
            System.out.println(savedSchool.getSchulNm());
        }

        System.out.println("""

                        // 두 번째 학교 입력 테스트
                        // 예상 결과 : 강동고등학교\
                """);
        // 두 번째 학교 입력 테스트
        // 예상 결과 : 강동고등학교
        String json2 = """
                {
                                    "ATPT_OFCDC_SC_CODE": "B10",
                                    "ATPT_OFCDC_SC_NM": "서울특별시교육청",
                                    "SD_SCHUL_CODE": "7010117",
                                    "SCHUL_NM": "강동고등학교",
                                    "ENG_SCHUL_NM": "Kangdong High School",
                                    "SCHUL_KND_SC_NM": "고등학교",
                                    "LCTN_SC_NM": "서울특별시",
                                    "JU_ORG_NM": "서울특별시교육청",
                                    "FOND_SC_NM": "사립",
                                    "ORG_RDNZC": "05279 ",
                                    "ORG_RDNMA": "서울특별시 강동구 구천면로 572",
                                    "ORG_RDNDA": "(상일동)",
                                    "ORG_TELNO": "02-427-0231",
                                    "HMPG_ADRES": "http://kangdong.sen.hs.kr",
                                    "COEDU_SC_NM": "남여공학",
                                    "ORG_FAXNO": "02-441-3494",
                                    "HS_SC_NM": "일반고",
                                    "INDST_SPECL_CCCCL_EXST_YN": "N",
                                    "HS_GNRL_BUSNS_SC_NM": "일반계",
                                    "SPCLY_PURPS_HS_ORD_NM": null,
                                    "ENE_BFE_SEHF_SC_NM": "후기",
                                    "DGHT_SC_NM": "주간",
                                    "FOND_YMD": "19841217",
                                    "FOAS_MEMRD": "19850908",
                                    "LOAD_DTM": "20230615"
                                }""";


        schoolInformationDTO = gson.fromJson(json2, SchoolInformationDTO.class);
        schoolInformation = schoolInformationService.dtoToEntity(schoolInformationDTO);

        savedSchool = schoolInformationService.save(schoolInformation);
        if(savedSchool == null){
            System.out.println("school is already present");
        }
        else{
            System.out.println(savedSchool.getSchulNm());
        }
    }
}
