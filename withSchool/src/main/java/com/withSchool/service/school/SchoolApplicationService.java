package com.withSchool.service.school;

import com.withSchool.controller.superadmin.SuperController;
import com.withSchool.dto.school.ReqApplicationDefaultDTO;
import com.withSchool.dto.school.ResApplicationDefaultDTO;
import com.withSchool.dto.school.SchoolInformationDTO;
import com.withSchool.entity.school.SchoolApplication;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.repository.school.SchoolApplicationRepository;
import com.withSchool.service.user.EmailService;
import com.withSchool.service.user.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchoolApplicationService {
    private final SchoolApplicationRepository schoolApplicationRepository;
    private final EmailService emailService;

    public ResApplicationDefaultDTO save(ReqApplicationDefaultDTO reqApplicationDefaultDTO) {
        SchoolApplication req = reqApplicationDefaultDTO.toEntity(0);
        ResApplicationDefaultDTO res = schoolApplicationRepository.save(req).toResApplicationDefaultDTO();
        emailService.sendApplicationMessage(reqApplicationDefaultDTO,0);
        return res;
    }

    public List<ResApplicationDefaultDTO> findAll() {
        List<SchoolApplication> schoolApplications = schoolApplicationRepository.findAll();
        List<ResApplicationDefaultDTO> dtos = new ArrayList<>();

        for (SchoolApplication s : schoolApplications) {
            dtos.add(s.toResApplicationDefaultDTO());
        }

        return dtos;
    }

    public ResApplicationDefaultDTO findById(Long schoolApplicationId) {
        Optional<SchoolApplication> res = schoolApplicationRepository.findById(schoolApplicationId);
        if(res.isEmpty()) throw new RuntimeException("There is no appropriate application");

        return res.get().toResApplicationDefaultDTO();
    }

    public ResApplicationDefaultDTO changeState(Long schoolApplicationId, int state) {
        Optional<SchoolApplication> res = schoolApplicationRepository.findById(schoolApplicationId);
        if(res.isEmpty()) throw new RuntimeException("There is no appropriate application");

        SchoolApplication schoolApplication = res.get();
        if(state < 1 || state > 3 || state == schoolApplication.getState()) throw new RuntimeException("Check state");
        emailService.sendApplicationMessage(schoolApplication.toReqApplicationDefaultDTO(), state);

        SchoolApplication newSchoolApplication = SchoolApplication.builder()
                .schoolApplicationId(schoolApplication.getSchoolApplicationId())
                .schoolName(schoolApplication.getSchoolName())
                .schoolAdminEmail(schoolApplication.getSchoolAdminEmail())
                .schoolPhoneNumber(schoolApplication.getSchoolPhoneNumber())
                .schoolAdminName(schoolApplication.getSchoolAdminName())
                .state(state)
                .regDate(schoolApplication.getRegDate())
                .SD_SCHUL_CODE(schoolApplication.getSD_SCHUL_CODE())
                .build();
        SchoolApplication savedApplication = schoolApplicationRepository.save(newSchoolApplication);

        return savedApplication.toResApplicationDefaultDTO();
    }

    public void deleteById(Long schoolApplicationId) {
        if(!schoolApplicationRepository.existsById(schoolApplicationId)) {
            throw new RuntimeException("There is no appropriate application to delete");
        }
        schoolApplicationRepository.deleteById(schoolApplicationId);
    }
}
