package com.withSchool.service.school;

import com.withSchool.dto.payment.ResSubscriptionDTO;
import com.withSchool.dto.school.SchoolInformationDTO;
import com.withSchool.dto.school.SchoolInformationListDTO;
import com.withSchool.entity.payment.Subscription;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.repository.payment.SubscriptionRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.user.NotificationService;
import com.withSchool.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchoolInformationService {

    private final SchoolInformationRepository schoolInformationRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public ResponseEntity<String> saveSchool(SchoolInformationDTO schoolInformationDTO, String adminEmail) {
        SchoolInformation schoolInformation = this.save(this.dtoToEntity(schoolInformationDTO));
        if (schoolInformation == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body(schoolInformationDTO.getSCHUL_NM() + "의 생성에 실패하였습니다.");
        }

        try {
            userService.registerAdmin(schoolInformationDTO, adminEmail);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body("어드민 계정 생성중에 오류가 발생하였습니다");
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                .body(schoolInformation.getSchulNm() + ", 학교어드민 계정이 생성되었습니다.");
    }

    public List<SchoolInformationListDTO> findAll() {
        return schoolInformationRepository.findAll().stream().map(schoolInformation -> new SchoolInformationListDTO(
                schoolInformation.getSchoolId(),
                schoolInformation.getSchulNm(),
                schoolInformation.getOrgRdnma(),
                schoolInformation.getOrgTelno(),
                schoolInformation.getJuOrgNm(),
                schoolInformation.getSdSchulCode(),
                schoolInformation.getPaymentState(),
                schoolInformation.getServiceType(),
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

    @Transactional
    public ResSubscriptionDTO subscribeSchool(Long schoolId, int plan, String billingKey, LocalDate endDate) {
        Optional<SchoolInformation> schoolOpt = schoolInformationRepository.findById(schoolId);
        if (schoolOpt.isEmpty()) {
            throw new RuntimeException("해당하는 학교가 없습니다");
        }

        SchoolInformation school = schoolOpt.get();

        Subscription subscription = Subscription.builder()
                .plan(plan)
                .startDate(LocalDate.now())
                .endDate(endDate)
                .billingKey(billingKey)
                .schoolInformation(school)
                .build();
        subscriptionRepository.save(subscription);

        school.setServiceType(plan);
        schoolInformationRepository.save(school);


        return ResSubscriptionDTO.builder()
                .subscriptionId(subscription.getSubscriptionId())
                .plan(subscription.getPlan())
                .startDate(subscription.getStartDate())
                .endDate(subscription.getEndDate())
                .build();
    }

    @Transactional
    public ResSubscriptionDTO upgradeSubscription(Long subscriptionId,int newPlan,LocalDate endDate) {
        Optional<Subscription> subscriptionOpt = subscriptionRepository.findById(subscriptionId);
        if (subscriptionOpt.isEmpty()) {
            throw new RuntimeException("이용하시고 있는 플랜이 없습니다");
        }
        Subscription subscription = subscriptionOpt.get();
        SchoolInformation schoolInformation = subscription.getSchoolInformation();
        int totalUsers = userRepository.findUsersCountBySchoolId(schoolInformation.getSchoolId());
        int newPlanUsers;
        switch (newPlan){
            case 0:
                newPlanUsers = 300;
                break;
            case 1:
                newPlanUsers = 700;
                break;
            default:
                newPlanUsers = 5000;
                break;
        }

        if(totalUsers > newPlanUsers){
            throw new RuntimeException("현재 인원이 해당 플랜의 인원수를 초과합니다. 인원을 줄여주세요");
        }

        // 기존 플랜 종료
        subscription.changeEndDate(LocalDate.now());
        subscriptionRepository.save(subscription);
        // 새로운 플랜 등록
        Subscription newSubscription = Subscription.builder()
                .plan(newPlan)
                .startDate(LocalDate.now())
                .endDate(endDate)
                .billingKey(subscription.getBillingKey())
                .schoolInformation(schoolInformation)
                .build();
        subscriptionRepository.save(newSubscription);

        schoolInformation.setServiceType(newPlan);
        schoolInformationRepository.save(schoolInformation);

        return ResSubscriptionDTO.builder()
                .subscriptionId(newSubscription.getSubscriptionId())
                .plan(newSubscription.getPlan())
                .startDate(newSubscription.getStartDate())
                .endDate(newSubscription.getEndDate())
                .build();
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
                .paymentState(dto.getPaymentState())
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
                .paymentState(entity.getPaymentState())
                .build();
    }

    @Transactional
    public void delete(Long id) {
        userRepository.deleteAllUsersBySchoolId(id);
        schoolInformationRepository.deleteById(id);
    }
}
