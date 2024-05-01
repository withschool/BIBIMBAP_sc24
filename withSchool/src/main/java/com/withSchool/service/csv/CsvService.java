package com.withSchool.service.csv;

import ch.qos.logback.core.testUtil.RandomUtil;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import com.withSchool.dto.csv.CsvRequestDTO;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.classes.ClassRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.subject.SubjectRepository;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.classes.ClassService;
import com.withSchool.service.mapping.StudentSubjectService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class CsvService {

    private final UserRepository userRepository;
    private final ClassRepository classRepository;
    private final SchoolInformationRepository schoolInformationRepository;
    private final StudentSubjectService studentSubjectService;
    private final SubjectRepository subjectRepository;

    @Transactional
    public void registerUser(CsvRequestDTO dto){
        try(CSVReader csvReader = new CSVReader(new InputStreamReader(dto.getFile().getInputStream(), "UTF-8"))) {
            List<String[]> lines = csvReader.readAll();
            //lines.forEach(line -> System.out.println(String.join(",", line)));
            lines.stream()
                    .skip(1)
                    .forEach(line->{
                        //System.out.println(Arrays.toString(line));
                        if(line[0].equals("학생")){
                            Optional<ClassInformation> classInformation = classRepository.findByGradeAndInClass(Integer.parseInt(line[3]),Integer.parseInt(line[4]));
                            Optional<User> user = userRepository.findById(dto.getId());
                            if(user.isPresent()){
                                Optional<SchoolInformation> schoolInformation = schoolInformationRepository.findById(user.get().getSchoolInformation().getSchoolId());
                                if(classInformation.isPresent() && schoolInformation.isPresent()){
                                    User newUser = User.builder()
                                            .name(line[1])
                                            .birthDate(line[2])
                                            .accountType(0)
                                            .classInformation(classInformation.get())
                                            .schoolInformation(schoolInformation.get())
                                            .userCode(RandomStringUtils.randomAlphanumeric(8))
                                            .parentCode(RandomStringUtils.randomAlphanumeric(8))
                                            .build();
                                    userRepository.save(newUser);
                                    Arrays.stream(line).skip(5).forEach(s->{
                                        Optional<Subject> subject = subjectRepository.findBySubjectName(s,schoolInformation.get().getSchoolId());
                                        if(subject.isPresent()){
                                            studentSubjectService.register(newUser,subject.get());
                                        }
                                    });
                                }
                            }
                        }
                        else if(line[0].equals("교사")){ // 교사
                            Optional<ClassInformation> classInformation = classRepository.findByGradeAndInClass(Integer.parseInt(line[3]),Integer.parseInt(line[4]));
                            Optional<User> user = userRepository.findById(dto.getId());
                            if(user.isPresent()){
                                Optional<SchoolInformation> schoolInformation = schoolInformationRepository.findById(user.get().getSchoolInformation().getSchoolId());
                                if(classInformation.isPresent() && schoolInformation.isPresent()){
                                    User newUser = User.builder()
                                            .name(line[1])
                                            .birthDate(line[2])
                                            .accountType(2)
                                            .classInformation(classInformation.get())
                                            .schoolInformation(schoolInformation.get())
                                            .userCode(RandomStringUtils.randomAlphanumeric(8))
                                            .build();
                                    userRepository.save(newUser);
                                    Arrays.stream(line).skip(5).forEach(s->{
                                        Optional<Subject> subject = subjectRepository.findBySubjectName(s,schoolInformation.get().getSchoolId());
                                        if(subject.isPresent()){
                                            studentSubjectService.register(newUser,subject.get());
                                        }
                                    });
                                }
                            }
                        }
                    });
        }catch(Exception e){
            throw new RuntimeException("CSV 파일 처리 중 오류 발생", e);
        }
    }

}
