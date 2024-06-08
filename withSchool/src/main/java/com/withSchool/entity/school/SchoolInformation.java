package com.withSchool.entity.school;

import com.withSchool.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Comment;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString
@Table(name = "school_information")
public class SchoolInformation extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "school_id", unique = true)
    @Comment("학교 PK")
    private Long schoolId;

    @Column(name = "ATPT_OFCDC_SC_CODE")
    @Comment("시도교육청코드")
    private String atptOfcdcScCode;

    @Column(name = "ATPT_OFCDC_SC_NM")
    @Comment("시도교육청명")
    private String atptOfcdcScNm;

    @Column(name = "SD_SCHUL_CODE")
    @Comment("행정표준코드")
    private String sdSchulCode;

    @Column(name = "SCHUL_NM")
    @Comment("학교명")
    private String schulNm;

    @Column(name = "ENG_SCHUL_NM")
    @Comment("영문학교명")
    private String engSchulNm;

    @Column(name = "SCHUL_KND_SC_NM")
    @Comment("학교종류명")
    private String schulKndScNm;

    @Column(name = "LCTN_SC_NM")
    @Comment("시도명")
    private String lctnScNm;

    @Column(name = "JU_ORG_NM")
    @Comment("관할조직명")
    private String juOrgNm;

    @Column(name = "FOND_SC_NM")
    @Comment("설립명")
    private String fondScNm;

    @Column(name = "ORG_RDNZC")
    @Comment("도로명우편번호")
    private String orgRdnzc;

    @Column(name = "ORG_RDNMA")
    @Comment("도로명주소")
    private String orgRdnma;

    @Column(name = "ORG_RDNDA")
    @Comment("도로명상세주소")
    private String orgRdnda;

    @Column(name = "ORG_TELNO")
    @Comment("전화번호")
    private String orgTelno;

    @Column(name = "HMPG_ADRES")
    @Comment("홈페이지주소")
    private String hmpgAdres;

    @Column(name = "COEDU_SC_NM")
    @Comment("남녀공학구분명")
    private String coeduScNm;

    @Column(name = "ORG_FAXNO")
    @Comment("팩스번호")
    private String orgFaxno;

    @Column(name = "HS_SC_NM")
    @Comment("고등학교구분명")
    private String hsScNm;

    @Column(name = "INDST_SPECL_CCCCL_EXST_YN")
    @Comment("산업체특별학급존재여부")
    private String indstSpeclCccclExstYn;

    @Column(name = "HS_GNRL_BUSNS_SC_NM")
    @Comment("고등학교일반전문구분명")
    private String hsGnrlBusnsScNm;

    @Column(name = "SPCLY_PURPS_HS_ORD_NM")
    @Comment("특수목적고등학교계열명")
    private String spclyPurpsHsOrdNm;

    @Column(name = "ENE_BFE_SEHF_SC_NM")
    @Comment("입시전후기구분명")
    private String eneBfeSehfScNm;

    @Column(name = "DGHT_SC_NM")
    @Comment("주야구분명")
    private String dghtScNm;

    @Column(name = "FOND_YMD")
    @Comment("설립일자")
    private String fondYmd;

    @Column(name = "FOAS_MEMRD")
    @Comment("개교기념일")
    private String foasMemrd;

    @Column(name = "LOAD_DTM")
    @Comment("수정일자")
    private String loadDtm;

    @Comment("""
            결제 상태
            0 - 결제 안됨
            1 - 결제 됨""")
    @Column(columnDefinition = "int default 1")
    private int paymentState;

    @Comment("""
            서비스 타입
                        
            0 - 소규모(300명)
            1 - 중규모(500명)
            2 - 대규모(700명)
                      
            9 - 무료
            """)
    @Column(columnDefinition = "int default 9")
    private int serviceType;

}
