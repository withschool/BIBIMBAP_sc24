package com.withSchool.service.csv;

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
import com.withSchool.service.mapping.StudentSubjectService;
import com.withSchool.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CsvService {

    private final UserRepository userRepository;
    private final ClassRepository classRepository;
    private final SchoolInformationRepository schoolInformationRepository;
    private final StudentSubjectService studentSubjectService;
    private final SubjectRepository subjectRepository;
    private final UserService userService;

    @Transactional
    public void registerUser(CsvRequestDTO dto) throws RuntimeException{
        try (CSVReader csvReader = new CSVReader(new InputStreamReader(dto.getFile().getInputStream(),"euc-kr"))) {
            List<String[]> lines = csvReader.readAll();
            Long schoolId = userService.getCurrentUserSchoolId();
            lines.stream()
                    .skip(1)
                    .forEach(line -> {
                        try {
                            processLine(line, schoolId, dto.getId());
                        } catch (Exception e) {
                            throw new RuntimeException(e.getMessage());
                        }
                    });
        } catch (IOException e) {
            throw new RuntimeException("CSV file got error when reading", e);
        } catch (RuntimeException | CsvException e) {
            throw new RuntimeException(e);
        }
    }

    private void processLine(String[] line, Long schoolId, String id){
        if (line[0].equals("학생") || line[0].equals("교사")) {
            createUser(line, schoolId, id, line[0].equals("학생") ? 0 : 2);
        } else {
            throw new IllegalArgumentException("not defined usertype: " + line[0]);
        }
    }

    private void createUser(String[] line, Long schoolId, String id, int accountType) {
        Optional<ClassInformation> classInformation = classRepository.findByGradeAndInClassAndYearAndSchoolInformation_SchoolId(
                Integer.parseInt(line[3]), Integer.parseInt(line[4]), Integer.parseInt(line[5]), schoolId);
        Optional<User> user = userRepository.findById(id);

        if (user.isPresent() && classInformation.isPresent()) {
            Optional<SchoolInformation> schoolInformation = schoolInformationRepository.findById(user.get().getSchoolInformation().getSchoolId());

            if (schoolInformation.isPresent()) {
                User newUser = User.builder()
                        .name(line[1])
                        .birthDate(line[2])
                        .accountType(accountType)
                        .classInformation(classInformation.get())
                        .schoolInformation(schoolInformation.get())
                        .userCode(RandomStringUtils.randomAlphanumeric(8))
                        .build();

                userRepository.save(newUser);
                registerSubjects(line, schoolInformation.get(), newUser);
            } else {
                throw new NoSuchElementException("can't find school's information: " + user.get().getSchoolInformation().getSchoolId());
            }
        } else {
            throw new NoSuchElementException("can't find userInfo or classInfo.");
        }
    }

    private void registerSubjects(String[] line, SchoolInformation schoolInformation, User newUser) {
        for (int i = 6; i < line.length; i++) {
            String subjectName = line[i];
            if (subjectName.isEmpty()) { // subject이름이 비어있으면 해당 라인 입력 종료
                break;
            }
            String grade = Integer.toString(newUser.getClassInformation().getGrade());
            String year = Integer.toString(newUser.getClassInformation().getYear());
            Long schoolId = schoolInformation.getSchoolId();


            Optional<Subject> subject = subjectRepository.findBySubjectNameAndGradeAndYear(subjectName, grade, year, schoolId);
            if (subject.isPresent()) {
                studentSubjectService.register(newUser, subject.get());
            } else {
                throw new NoSuchElementException("can't find subjectInfo: " + subjectName);
            }
        }
    }
}
