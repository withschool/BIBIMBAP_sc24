package com.withSchool.service.school;

import com.withSchool.dto.payment.ReqPlanDTO;
import com.withSchool.dto.payment.ResCurrentPlanDTO;
import com.withSchool.dto.school.ReqSchoolInformationChangePaymentStateDTO;
import com.withSchool.dto.school.ReqSchoolInformationSaveDTO;
import com.withSchool.dto.school.SchoolInformationDTO;
import com.withSchool.dto.school.SchoolInformationListDTO;
import com.withSchool.entity.payment.Subscription;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.repository.payment.SubscriptionRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.user.UserRepository;
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

    public ResponseEntity<String> saveSchool(ReqSchoolInformationSaveDTO reqSchoolInformationSaveDTO) {
        SchoolInformation schoolInformation = this.save(reqSchoolInformationSaveDTO.getSchoolInformationNoPaymentStateDTO().toSaveEntity());
        if (schoolInformation == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE + ";charset=" + StandardCharsets.UTF_8)
                    .body(reqSchoolInformationSaveDTO.getSchoolInformationNoPaymentStateDTO().getSCHUL_NM() + "의 생성에 실패하였습니다.");
        }

        try {
            userService.registerAdmin(reqSchoolInformationSaveDTO.getSchoolInformationNoPaymentStateDTO(), reqSchoolInformationSaveDTO.getAdminEmail());
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
    public void saveBillingKey(Long schoolId,String billingKey) {
        SchoolInformation school = schoolInformationRepository.findById(schoolId)
                .orElseThrow(()->new RuntimeException("해당하는 학교가 존재하지 않습니다"));
        school.setBillingKey(billingKey);
        schoolInformationRepository.save(school);
    }
    public Boolean checkBillingKey(Long schoolId) {
        SchoolInformation school = schoolInformationRepository.findById(schoolId)
                .orElseThrow(()->new RuntimeException("해당하는 학교가 존재하지 않습니다"));
        if(school.getBillingKey() == null){
            return false;
        }
        else{
            return true;
        }
    }
    public void saveFirstPlan(Long schoolId, ReqPlanDTO reqPlanDTO) {
        SchoolInformation schoolInformation = schoolInformationRepository.findById(schoolId)
                .orElseThrow(()->new RuntimeException("해당하는 학교가 존재하지 않습니다"));
        Subscription subscription = Subscription.builder()
                .plan(reqPlanDTO.getPlan())
                .startDate(LocalDate.now().plusWeeks(2))
                .billingKey(schoolInformation.getBillingKey())
                .schoolInformation(schoolInformation)
                .build();
        subscriptionRepository.save(subscription);
    }
    public void changePlan(Long schoolId, ReqPlanDTO reqPlanDTO) {
        SchoolInformation schoolInformation = schoolInformationRepository.findById(schoolId)
                .orElseThrow(() -> new RuntimeException("해당하는 학교가 존재하지 않습니다"));

        int totalUsers = userRepository.findUsersCountBySchoolId(schoolInformation.getSchoolId());
        int newPlanUsers;
        switch (reqPlanDTO.getPlan()){
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

        LocalDate now = LocalDate.now();

        // 현재 활성화된 구독 찾기
        Subscription currentSubscription = subscriptionRepository.findBySchoolInformationAndEndDateIsNull(schoolInformation)
                .orElseThrow(() -> new RuntimeException("현재 활성화된 구독이 없습니다"));

        // 기존 구독 종료 날짜 설정
        currentSubscription.setEndDate(now);
        subscriptionRepository.save(currentSubscription);

        // 새로운 구독 생성
        Subscription newSubscription = Subscription.builder()
                .plan(reqPlanDTO.getPlan())
                .startDate(now)
                .billingKey(schoolInformation.getBillingKey())
                .schoolInformation(schoolInformation)
                .build();
        subscriptionRepository.save(newSubscription);
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
                .serviceType(entity.getServiceType())
                .build();
    }

    @Transactional
    public void delete(Long id) {
        userRepository.deleteAllUsersBySchoolId(id);
        schoolInformationRepository.deleteById(id);
    }

    @Transactional
    public void cancelSubscription(Long schoolId) {
        SchoolInformation schoolInformation = schoolInformationRepository.findById(schoolId)
                .orElseThrow(() -> new RuntimeException("해당하는 학교가 존재하지 않습니다"));

        Subscription currentSubscription = subscriptionRepository.findBySchoolInformationAndEndDateIsNull(schoolInformation)
                .orElseThrow(() -> new RuntimeException("현재 활성화된 구독이 없습니다"));

        LocalDate now = LocalDate.now();
        currentSubscription.setEndDate(now);
        subscriptionRepository.save(currentSubscription);

        schoolInformation.setPaymentState(0);
        schoolInformationRepository.save(schoolInformation);
    }
    public ResCurrentPlanDTO getCurrentPlan(Long schoolId) {
        SchoolInformation school = schoolInformationRepository.findById(schoolId)
                .orElseThrow(() -> new RuntimeException("해당하는 학교가 존재하지 않습니다"));

        int userCount = userRepository.findUsersCountBySchoolId(schoolId);

        Subscription currentSubscription = subscriptionRepository.findBySchoolInformationAndEndDateIsNull(school)
                .orElse(null);

        LocalDate nextBillingDate = null;
        if (currentSubscription != null) {
            nextBillingDate = calculateNextBillingDate(currentSubscription.getStartDate());
        }

        return ResCurrentPlanDTO.builder()
                .plan(currentSubscription != null ? currentSubscription.getPlan() : 9)
                .userCount(userCount)
                .nextBillingDate(nextBillingDate)
                .build();
    }

    private LocalDate calculateNextBillingDate(LocalDate startDate) {
        LocalDate now = LocalDate.now();
        LocalDate nextBillingDate = startDate;

        while (!nextBillingDate.isAfter(now)) {
            nextBillingDate = nextBillingDate.plusMonths(1);
        }

        return nextBillingDate;
    }

    public SchoolInformationDTO changePaymentState(ReqSchoolInformationChangePaymentStateDTO reqSchoolInformationChangePaymentStateDTO) {
        Long schoolId = reqSchoolInformationChangePaymentStateDTO.getSchoolId();
        int paymentState = reqSchoolInformationChangePaymentStateDTO.getPaymentState();

        Optional<SchoolInformation> optionalSchoolInformation = schoolInformationRepository.findById(schoolId);
        if (optionalSchoolInformation.isEmpty()) {
            throw new RuntimeException("No School");
        }

        SchoolInformation schoolInformation = optionalSchoolInformation.get();
        schoolInformation.setPaymentState(paymentState);

        SchoolInformation savedSchool = schoolInformationRepository.save(schoolInformation);
        return entityToDTO(savedSchool);
    }
}
