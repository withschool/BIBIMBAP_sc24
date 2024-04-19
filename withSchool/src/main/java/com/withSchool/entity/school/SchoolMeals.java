package com.withSchool.entity.school;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "school_meals")
public class SchoolMeals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "school_meals_id", unique = true, nullable = false)
    @Comment("급식ID")
    private Long smId;

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

    @Column(name = "MMEAL_SC_CODE")
    @Comment("급식코드")
    private String mmealScCode;

    @Column(name = "MMEAL_SC_NM")
    @Comment("급식명")
    private String mmealScNm;

    @Column(name = "MLSV_YMD")
    @Comment("급식일자")
    private String mlsyYmd;

    @Column(name = "MLSV_FGR")
    @Comment("급식요일")
    private String mlsyFgr;

    @Column(name = "DDISH_NM")
    @Comment("요리명")
    private String ddishNm;

    @Column(name = "ORPLC_INFO")
    @Comment("원산지정보")
    private String orplcInfo;

    @Column(name = "CAL_INFO")
    @Comment("칼로리정보")
    private String calInfo;

    @Column(name = "NTR_INFO")
    @Comment("영양정보")
    private String ntrInfo;

    @Column(name = "MLSV_FROM_YMD")
    @Comment("급식시작일자")
    private String mlsyFromYmd;

    @Column(name = "MLSV_TO_YMD")
    @Comment("급식종료일자")
    private String mlsyToYmd;

    @Column(name = "LOAD_DTM")
    @Comment("수정일자")
    private String loadDtm;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    @Comment("학교 PK")
    private SchoolInformation schoolInformation;

}
