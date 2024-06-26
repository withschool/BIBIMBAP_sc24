package com.withSchool.service.school;

import com.withSchool.dto.school.SchoolInformationDTO;
import com.withSchool.dto.school.SchoolInformationListDTO;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchoolInformationService {

    private final SchoolInformationRepository schoolInformationRepository;
    private final UserRepository userRepository;

    public List<SchoolInformationListDTO> findAll() {
        return schoolInformationRepository.findAll().stream().map(schoolInformation -> new SchoolInformationListDTO(
                schoolInformation.getSchoolId(),
                schoolInformation.getSchulNm(),
                schoolInformation.getOrgRdnma(),
                schoolInformation.getOrgTelno(),
                schoolInformation.getJuOrgNm(),
                schoolInformation.getSdSchulCode(),
                schoolInformation.getPaymentState(),
                schoolInformation.getRegDate()
        )).collect(Collectors.toList());
    }

    public SchoolInformationDTO findById(Long id) {
        SchoolInformation schoolInformation = schoolInformationRepository.findById(id).orElseThrow(() -> new RuntimeException("값이 존재하지 않습니다."));
        return entityToDTO(schoolInformation);

    }

    public boolean isDuplicateSchool(String AtptOfcdcScCode, String SdSchulCode) {
        Optional<SchoolInformation> schoolInformation = schoolInformationRepository.findByAtptOfcdcScCodeAndSdSchulCode(AtptOfcdcScCode, SdSchulCode);

        return schoolInformation.isPresent();
    }

    public SchoolInformation save(SchoolInformation schoolInformation) {
        if (isDuplicateSchool(schoolInformation.getAtptOfcdcScCode(), schoolInformation.getSdSchulCode())) {
            return null;
        } else return schoolInformationRepository.save(schoolInformation);
    }

    public SchoolInformation dtoToEntity(SchoolInformationDTO dto) {
        return SchoolInformation.builder()
                .atptOfcdcScCode(dto.getATPT_OFCDC_SC_CODE())
                .atptOfcdcScNm(dto.getATPT_OFCDC_SC_NM())
                .sdSchulCode(dto.getSD_SCHUL_CODE())
                .schulNm(dto.getSCHUL_NM())
                .engSchulNm(dto.getENG_SCHUL_NM())
                .schulKndScNm(dto.getSCHUL_KND_SC_NM())
                .lctnScNm(dto.getLCTN_SC_NM())
                .juOrgNm(dto.getJU_ORG_NM())
                .fondScNm(dto.getFOND_SC_NM())
                .orgRdnzc(dto.getORG_RDNZC())
                .orgRdnma(dto.getORG_RDNMA())
                .orgRdnda(dto.getORG_RDNDA())
                .orgTelno(dto.getORG_TELNO())
                .hmpgAdres(dto.getHMPG_ADRES())
                .coeduScNm(dto.getCOEDU_SC_NM())
                .orgFaxno(dto.getORG_FAXNO())
                .hsScNm(dto.getHS_SC_NM())
                .indstSpeclCccclExstYn(dto.getINDST_SPECL_CCCCL_EXST_YN())
                .hsGnrlBusnsScNm(dto.getHS_GNRL_BUSNS_SC_NM())
                .spclyPurpsHsOrdNm(dto.getSPCLY_PURPS_HS_ORD_NM())
                .eneBfeSehfScNm(dto.getENE_BFE_SEHF_SC_NM())
                .dghtScNm(dto.getDGHT_SC_NM())
                .fondYmd(dto.getFOND_YMD())
                .foasMemrd(dto.getFOAS_MEMRD())
                .loadDtm(dto.getLOAD_DTM())
                .build();
    }

    public SchoolInformationDTO entityToDTO(SchoolInformation entity) {
        return SchoolInformationDTO.builder()
                .ATPT_OFCDC_SC_CODE(entity.getAtptOfcdcScCode())
                .ATPT_OFCDC_SC_NM(entity.getAtptOfcdcScNm())
                .SD_SCHUL_CODE(entity.getSdSchulCode())
                .SCHUL_NM(entity.getSchulNm())
                .ENG_SCHUL_NM(entity.getEngSchulNm())
                .SCHUL_KND_SC_NM(entity.getSchulKndScNm())
                .LCTN_SC_NM(entity.getLctnScNm())
                .JU_ORG_NM(entity.getJuOrgNm())
                .FOND_SC_NM(entity.getFondScNm())
                .ORG_RDNZC(entity.getOrgRdnzc())
                .ORG_RDNMA(entity.getOrgRdnma())
                .ORG_RDNDA(entity.getOrgRdnda())
                .ORG_TELNO(entity.getOrgTelno())
                .HMPG_ADRES(entity.getHmpgAdres())
                .COEDU_SC_NM(entity.getCoeduScNm())
                .ORG_FAXNO(entity.getOrgFaxno())
                .HS_SC_NM(entity.getHsScNm())
                .INDST_SPECL_CCCCL_EXST_YN(entity.getIndstSpeclCccclExstYn())
                .HS_GNRL_BUSNS_SC_NM(entity.getHsGnrlBusnsScNm())
                .SPCLY_PURPS_HS_ORD_NM(entity.getSpclyPurpsHsOrdNm())
                .ENE_BFE_SEHF_SC_NM(entity.getEneBfeSehfScNm())
                .DGHT_SC_NM(entity.getDghtScNm())
                .FOND_YMD(entity.getFondYmd())
                .FOAS_MEMRD(entity.getFoasMemrd())
                .LOAD_DTM(entity.getLoadDtm())
                .build();
    }

    @Transactional
    public void delete(Long id) {
        userRepository.deleteAllUsersBySchoolId(id);
        schoolInformationRepository.deleteById(id);
    }
}
