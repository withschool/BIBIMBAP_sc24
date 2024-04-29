package com.withSchool.service.school;

import com.withSchool.dto.school.ClientSchoolNoticeDTO;
import com.withSchool.dto.school.SchoolNoticeDTO;
import com.withSchool.dto.school.SchoolNoticeToClientDTO;
import com.withSchool.dto.user.StudentListDTO;
import com.withSchool.entity.school.SchoolNotice;
import com.withSchool.repository.school.SchoolNoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchoolNoticeService {
    private final SchoolNoticeRepository schoolNoticeRepository;

    @Transactional
    public SchoolNotice save(SchoolNoticeDTO schoolNoticeDTO) {
        SchoolNotice schoolNotice = SchoolNotice.builder()
                .title(schoolNoticeDTO.getTitle())
                .content(schoolNoticeDTO.getContent())
                .user(schoolNoticeDTO.getUser())
                .schoolInformation(schoolNoticeDTO.getSchool())
                .build();

        return schoolNoticeRepository.save(schoolNotice);
    }

    @Transactional
    public SchoolNoticeToClientDTO findById(Long schoolNoticeId) {
        Optional<SchoolNotice> schoolNoticeOptional = schoolNoticeRepository.findById(schoolNoticeId);

        if(schoolNoticeOptional.isEmpty())return null;
        SchoolNotice schoolNotice = schoolNoticeOptional.get();

        StudentListDTO studentListDTO = StudentListDTO.builder()
                .id(schoolNotice.getUser().getId())
                .name(schoolNotice.getUser().getName())
                .userId(schoolNotice.getUser().getUserId())
                .build();

        return SchoolNoticeToClientDTO.builder()
                .title(schoolNotice.getTitle())
                .content(schoolNotice.getContent())
                .user(studentListDTO)
                .regDate(schoolNotice.getRegDate())
                .build();
    }

    @Transactional
    public List<SchoolNoticeToClientDTO> findAll(Long schoolId) {
        List<SchoolNotice> schoolNotices = schoolNoticeRepository.findAllBySchoolId(schoolId);

        List<SchoolNoticeToClientDTO> schoolNoticeToClientDTOS = new ArrayList<>();

        for (SchoolNotice s : schoolNotices) {
            StudentListDTO studentListDTO = StudentListDTO.builder()
                    .id(s.getUser().getId())
                    .name(s.getUser().getName())
                    .userId(s.getUser().getUserId())
                    .build();

            SchoolNoticeToClientDTO schoolNoticeDTO = SchoolNoticeToClientDTO.builder()
                    .title(s.getTitle())
                    .user(studentListDTO)
                    .content(s.getContent())
                    .regDate(s.getRegDate())
                    .build();

            schoolNoticeToClientDTOS.add(schoolNoticeDTO);
        }

        return schoolNoticeToClientDTOS;
    }

    @Transactional
    public SchoolNotice updateById(Long schoolNoticeId, ClientSchoolNoticeDTO clientSchoolNoticeDTO) {
        Optional<SchoolNotice> schoolNoticeOptional = schoolNoticeRepository.findById(schoolNoticeId);


        if (schoolNoticeOptional.isPresent()) {
            SchoolNotice schoolNotice = schoolNoticeOptional.get();

            String title = "";
            if(clientSchoolNoticeDTO.getTitle() == null) title = schoolNotice.getTitle();
            else title = clientSchoolNoticeDTO.getTitle();

            String content = "";
            if(clientSchoolNoticeDTO.getContent()==null) content = schoolNotice.getContent();
            else content = clientSchoolNoticeDTO.getContent();

            SchoolNotice result = SchoolNotice.builder()
                    .schoolNoticeId(schoolNoticeId)
                    .title(title)
                    .content(content)
                    .user(schoolNotice.getUser())
                    .schoolInformation(schoolNotice.getSchoolInformation())
                    .build();

            return schoolNoticeRepository.save(result);
        }

        return null;
    }

    public void deleteById(Long schoolNoticeId) {
        schoolNoticeRepository.deleteById(schoolNoticeId);
    }
}
