package com.withSchool.service;

import com.withSchool.dto.SchoolInformationDTO;
import com.withSchool.entity.SchoolInformation;
import com.withSchool.repository.SchoolInformationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchoolInformationService {

    private final SchoolInformationRepository schoolInformationRepository;

    public List<SchoolInformation> findAll() {
        return schoolInformationRepository.findAll();
    }

    public Optional<SchoolInformation> findById(Long id) {
        return schoolInformationRepository.findById(id);
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

    public void delete(Long id) {

        schoolInformationRepository.deleteById(id);
    }
}
