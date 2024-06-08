package com.withSchool.dto.school;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.annotations.SerializedName;
import lombok.*;


@Builder
@Data
@Getter
@ToString
public class SchoolInformationDTO {
    @JsonProperty("ATPT_OFCDC_SC_CODE")
    @SerializedName("ATPT_OFCDC_SC_CODE")
    private String ATPT_OFCDC_SC_CODE;

    @JsonProperty("ATPT_OFCDC_SC_NM")
    @SerializedName("ATPT_OFCDC_SC_NM")
    private String ATPT_OFCDC_SC_NM;

    @JsonProperty("SD_SCHUL_CODE")
    @SerializedName("SD_SCHUL_CODE")
    private String SD_SCHUL_CODE;

    @JsonProperty("SCHUL_NM")
    @SerializedName("SCHUL_NM")
    private String SCHUL_NM;

    @JsonProperty("ENG_SCHUL_NM")
    @SerializedName("ENG_SCHUL_NM")
    private String ENG_SCHUL_NM;

    @JsonProperty("SCHUL_KND_SC_NM")
    @SerializedName("SCHUL_KND_SC_NM")
    private String SCHUL_KND_SC_NM;

    @JsonProperty("LCTN_SC_NM")
    @SerializedName("LCTN_SC_NM")
    private String LCTN_SC_NM;

    @JsonProperty("JU_ORG_NM")
    @SerializedName("JU_ORG_NM")
    private String JU_ORG_NM;

    @JsonProperty("FOND_SC_NM")
    @SerializedName("FOND_SC_NM")
    private String FOND_SC_NM;

    @JsonProperty("ORG_RDNZC")
    @SerializedName("ORG_RDNZC")
    private String ORG_RDNZC;

    @JsonProperty("ORG_RDNMA")
    @SerializedName("ORG_RDNMA")
    private String ORG_RDNMA;

    @JsonProperty("ORG_RDNDA")
    @SerializedName("ORG_RDNDA")
    private String ORG_RDNDA;

    @JsonProperty("ORG_TELNO")
    @SerializedName("ORG_TELNO")
    private String ORG_TELNO;

    @JsonProperty("HMPG_ADRES")
    @SerializedName("HMPG_ADRES")
    private String HMPG_ADRES;

    @JsonProperty("COEDU_SC_NM")
    @SerializedName("COEDU_SC_NM")
    private String COEDU_SC_NM;

    @JsonProperty("ORG_FAXNO")
    @SerializedName("ORG_FAXNO")
    private String ORG_FAXNO;

    @JsonProperty("HS_SC_NM")
    @SerializedName("HS_SC_NM")
    private String HS_SC_NM;

    @JsonProperty("INDST_SPECL_CCCCL_EXST_YN")
    @SerializedName("INDST_SPECL_CCCCL_EXST_YN")
    private String INDST_SPECL_CCCCL_EXST_YN;

    @JsonProperty("HS_GNRL_BUSNS_SC_NM")
    @SerializedName("HS_GNRL_BUSNS_SC_NM")
    private String HS_GNRL_BUSNS_SC_NM;

    @JsonProperty("SPCLY_PURPS_HS_ORD_NM")
    @SerializedName("SPCLY_PURPS_HS_ORD_NM")
    private String SPCLY_PURPS_HS_ORD_NM;

    @JsonProperty("ENE_BFE_SEHF_SC_NM")
    @SerializedName("ENE_BFE_SEHF_SC_NM")
    private String ENE_BFE_SEHF_SC_NM;

    @JsonProperty("DGHT_SC_NM")
    @SerializedName("DGHT_SC_NM")
    private String DGHT_SC_NM;

    @JsonProperty("FOND_YMD")
    @SerializedName("FOND_YMD")
    private String FOND_YMD;

    @JsonProperty("FOAS_MEMRD")
    @SerializedName("FOAS_MEMRD")
    private String FOAS_MEMRD;

    @JsonProperty("LOAD_DTM")
    @SerializedName("LOAD_DTM")
    private String LOAD_DTM;

    private int paymentState;
}
