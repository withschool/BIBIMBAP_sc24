package com.withSchool.service.school;

import com.withSchool.dto.school.ReqApplicationDefaultDTO;
import com.withSchool.dto.school.ResApplicationDefaultDTO;
import com.withSchool.entity.school.SchoolApplication;
import com.withSchool.repository.school.SchoolApplicationRepository;
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

    public ResApplicationDefaultDTO save(ReqApplicationDefaultDTO reqApplicationDefaultDTO) {
        SchoolApplication req = reqApplicationDefaultDTO.toEntity(0);
        return schoolApplicationRepository.save(req).toResApplicationDefaultDTO();
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

        SchoolApplication newSchoolApplication = SchoolApplication.builder()
                .schoolApplicationId(schoolApplication.getSchoolApplicationId())
                .schoolName(schoolApplication.getSchoolName())
                .schoolAdminEmail(schoolApplication.getSchoolAdminEmail())
                .schoolPhoneNumber(schoolApplication.getSchoolPhoneNumber())
                .schoolAdminName(schoolApplication.getSchoolName())
                .state(state)
                .regDate(schoolApplication.getRegDate())
                .build();
        SchoolApplication savedApplication = schoolApplicationRepository.save(newSchoolApplication);

        return savedApplication.toResApplicationDefaultDTO();
    }
}
