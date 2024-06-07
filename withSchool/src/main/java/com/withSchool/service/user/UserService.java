package com.withSchool.service.user;

import com.withSchool.dto.mapping.UserClassDTO;
import com.withSchool.dto.school.SchoolInformationDTO;
import com.withSchool.dto.user.*;
import com.withSchool.entity.classes.ClassInformation;
import com.withSchool.entity.mapping.StudentSubject;
import com.withSchool.entity.mapping.TeacherSubject;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.subject.Subject;
import com.withSchool.entity.user.User;
import com.withSchool.repository.classes.ClassRepository;
import com.withSchool.repository.mapping.StudentSubjectRepository;
import com.withSchool.repository.mapping.TeacherSubjectRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import com.withSchool.repository.subject.SubjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.withSchool.JWT.JwtToken;
import com.withSchool.JWT.JwtTokenProvider;
import com.withSchool.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final ClassRepository classRepository;
    private final SchoolInformationRepository schoolInformationRepository;
    private final StudentSubjectRepository studentSubjectRepository;
    private final TeacherSubjectRepository teacherSubjectRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final SubjectRepository subjectRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Value("${raw-password}")
    String rawPassword;

    public User findById(String id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public List<ResUserUsercodeDTO> findAllBySchool_SchoolId() {
        Long schoolId = getCurrentUserSchoolId();
        List<User> res = userRepository.findAllBySchoolInformation_SchoolId(schoolId);

        List<ResUserUsercodeDTO> dtos = new ArrayList<>();
        for (User u : res) {
            dtos.add(u.toResUserUsercodeDTO());
        }

        return dtos;
    }

    public User findByUserId(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public User findByUsername(String username) {
        Optional<User> user = userRepository.findByName(username);
        return user.orElse(null);
    }

    public User findByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElse(null);
    }

    public User findByUserCode(String userCode) {
        Optional<User> user = userRepository.findByUserCode(userCode);
        return user.orElse(null);
    }

    public void registerAdmin(SchoolInformationDTO dto, String adminEmail) throws Exception{
        Optional<SchoolInformation> result = schoolInformationRepository.findByAtptOfcdcScCodeAndSdSchulCode(dto.getATPT_OFCDC_SC_CODE(),dto.getSD_SCHUL_CODE());
        if(result.isPresent()) {
            SchoolInformation schoolInformation = result.get();
            User admin = User.builder()
                    .id(schoolInformation.getSdSchulCode() + "_admin")
                    .password(passwordEncoder.encode(rawPassword))  // 초기 비밀번호 설정이여서 암호화 필요없을듯
                    .name("관리자")
                    .accountType(3)
                    .email(adminEmail)
                    .schoolInformation(schoolInformation)
                    .build();
            userRepository.save(admin);
            emailService.sendAdminMessage(schoolInformation.getSchulNm(), adminEmail, admin.getId(), rawPassword);
        }
    }

    public boolean isDuplicated(String id){
        return userRepository.existsById(id);
    }

    private boolean isParent(int accountType){
        return accountType == 1;
    }

    public void register(SignUpDTO signUpDTO) {
        log.info("회원가입 요청");

        String id = signUpDTO.getId();
        String password = passwordEncoder.encode(signUpDTO.getPassword());
        String name = signUpDTO.getName();
        String birthDate = signUpDTO.getBirthDate();
        String email = signUpDTO.getEmail();
        String phoneNumber = signUpDTO.getPhoneNumber().isEmpty() ? null : signUpDTO.getPhoneNumber();
        Boolean sex = signUpDTO.getSex();
        String address = signUpDTO.getAddress();


        // 중복된 아이디 체크
        if (userRepository.existsById(id)) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }
        else if(!signUpDTO.getPhoneNumber().isEmpty() && userRepository.existsByPhoneNumber(phoneNumber)){
            throw new RuntimeException("해당 전화번호로 이미 회원가입이 되었습니다.");
        }

        int accountType = signUpDTO.getAccountType();
        String userCode = signUpDTO.getUserCode();

        User response;

        if(isParent(accountType)){
            response = User.builder()
                .id(id)
                .email(email)
                .name(name)
                .sex(sex)
                .phoneNumber(phoneNumber)
                .address(address)
                .birthDate(birthDate)
                .accountType(accountType)
                .password(password)
                .build();
        }
        else{
            Optional<User> optionalUser = userRepository.findByUserCode(signUpDTO.getUserCode());
            if(optionalUser.isEmpty()){
                throw new RuntimeException("해당 유저코드를 가진 유저가 없습니다.");
            }

            User user = optionalUser.get();
            if(user.getId() != null){
                throw new RuntimeException("이미 회원가입이 된 계정입니다.");
            } else if (!name.equals(user.getName())) {
                throw new RuntimeException("잘못된 이름이 입력되었습니다.");
            }

            SchoolInformation schoolInformation = user.getSchoolInformation();
            ClassInformation classInformation = user.getClassInformation();

            Long userId = user.getUserId();
            accountType = user.getAccountType();

            response = User.builder()
                    .userId(userId)
                    .id(id)
                    .email(email)
                    .name(name)
                    .sex(sex)
                    .phoneNumber(phoneNumber)
                    .address(address)
                    .birthDate(birthDate)
                    .accountType(accountType)
                    .userCode(userCode)
                    .password(password)
                    .schoolInformation(schoolInformation)
                    .classInformation(classInformation)
                    .build();
        }

        // 회원가입
        userRepository.save(response);
    }

    public void delete(UserDeleteRequestDTO dto){
        List<Long> userId = dto.getUserId();
        userId.stream().forEach(u->{
            studentSubjectRepository.deleteSsByUserId(u);
            userRepository.deleteUserByUserId(u);
        });

    }


    public JwtToken signIn(String id, String password) {
        // 입력받은 사용자 정보를 바탕으로 authentication token을 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(id, password);

        // 생성된 authentication token을 사용해서 JwtAuthenticationFilter를 걸쳐 인증에 성공할 시에 authentication 객체가 생성
        // authentication 객체는 principal이라는 객체를 가지고 있으며, 사용자의 이름과 권한을 가지고 있음
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 생성된 authentication 정보를 가지고 jwt token을 생성
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);

        return jwtToken;
    }

    public User findBySchoolInformationSchoolIdAndNameAndUserCode(Long schoolId, String name, String userCode) {
        Optional<User> user = userRepository.findBySchoolInformationSchoolIdAndNameAndUserCode(schoolId, name, userCode);
        return user.orElse(null);
    }
    public SchoolInformation getCurrentUserSchoolInformation(Long childId) {
        // 1. childId가 null이면 현재 로그인된 사용자의 정보를 가져옴
        if (childId == null) {
            User user = getCurrentUser();
            SchoolInformation schoolInformation = user.getSchoolInformation();
            if (schoolInformation == null) {
                throw new IllegalStateException("User is not associated with any school");
            }
            return schoolInformation;
        }
        // 2. childId가 null이 아니면 해당 child의 정보를 가져옴
        else {
            User child = userRepository.findById(childId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
            SchoolInformation schoolInformation = child.getSchoolInformation();
            if (schoolInformation == null) {
                throw new IllegalStateException("User is not associated with any school");
            }
            return schoolInformation;
        }
    }

    public Long getCurrentUserSchoolId() {
        SchoolInformation schoolInformation = getCurrentUserSchoolInformation(null);
        return schoolInformation.getSchoolId();
    }

    public ClassInformation getCurrentUserClassInformation(){
        User user = getCurrentUser();
        ClassInformation classInformation = user.getClassInformation();
        if(classInformation == null){
            throw new IllegalStateException("User is not associated with any class");
        }
        return classInformation;
    }

    public Long getCurrentUserClassId(){
        ClassInformation classInformation = getCurrentUserClassInformation();
        return classInformation.getClassId();
    }

    public User getCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return this.findById(authentication.getName());
    }

    public void mapById(UserClassDTO userClassDTO) {
        User user = userRepository.findById(userClassDTO.getUserId()).orElseThrow(() -> new EntityNotFoundException("User not found with id " + userClassDTO.getUserId()));
        ClassInformation classInformation = classRepository.findById(userClassDTO.getClassId()).orElseThrow(() -> new EntityNotFoundException("Class not found with id " + userClassDTO.getClassId()));

        user.updateClassInfo(classInformation);

        userRepository.save(user);
    }
  
    public List<ResUserUsercodeDTO> findAllClassInformation_ClassId(){
        User user = getCurrentUser();
        List<User> users = userRepository.findAllByClassInformation_ClassId(user.getClassInformation().getClassId());

        List<ResUserUsercodeDTO> dtos = new ArrayList<>();

        for (User u : users) {
            dtos.add(u.toResUserUsercodeDTO());
        }

        return dtos;
    }

    public List<User> findStudentBySchoolInformationSchoolId(Long schoolId){
        return userRepository.findStudentBySchoolInformationSchoolId(schoolId);
    }

    public List<User> findStudentByClassId(Long schoolId){
        return userRepository.findStudentByClassId(schoolId);
    }

    public boolean isEnoughUserRemain(int inputSize) {
        SchoolInformation currentUserSchool = getCurrentUserSchoolInformation(null);
        List<User> specificSchoolUser = userRepository.findAllBySchoolInformation_SchoolIdAndAccountTypeNot(currentUserSchool.getSchoolId(), 4);

        int userLimit = 300 + currentUserSchool.getServiceType() * 200;

        int specificSchoolUserCount = specificSchoolUser.size();

        return userLimit - specificSchoolUserCount >= inputSize;
    }

    public void addOneUser(ReqUserRegisterDTO reqUserRegisterDTO) {
        if(!this.isEnoughUserRemain(1)) throw new RuntimeException("too many user input");

        int accountType = reqUserRegisterDTO.getType().equals("학생") ? 0 : 2;
        String name = reqUserRegisterDTO.getName();
        String birthDate = reqUserRegisterDTO.getBirthDate();

        Long schoolId = getCurrentUserSchoolId();
        SchoolInformation schoolInformation = getCurrentUserSchoolInformation(null);
        int grade = reqUserRegisterDTO.getGrade();
        int classNumber = reqUserRegisterDTO.getClassNumber();
        int semester = reqUserRegisterDTO.getSemester();
        int year = reqUserRegisterDTO.getYear();

        Optional<ClassInformation> optionalClassInformation = classRepository.findByGradeAndInClassAndYearAndSchoolInformation_SchoolId(grade, classNumber, year, schoolId);
        if(optionalClassInformation.isEmpty()) throw new RuntimeException("Check Class");
        ClassInformation classInformation = optionalClassInformation.get();

        String[] subjects = reqUserRegisterDTO.getSubjects();

        User user = User.builder()
                .name(name)
                .schoolInformation(schoolInformation)
                .classInformation(classInformation)
                .accountType(accountType)
                .birthDate(birthDate)
                .userCode(RandomStringUtils.randomAlphanumeric(8))
                .build();

        userRepository.save(user);

        for (String subjectName : subjects) {
            Optional<Subject> optionalSubject = subjectRepository.findBySubjectNameAndGradeAndYearAndSemester(subjectName, Integer.toString(grade), Integer.toString(year),Integer.toString(semester), schoolId);
            if(optionalSubject.isEmpty()) throw new RuntimeException("No subject with " + subjectName);
            Subject subject = optionalSubject.get();

            if(accountType == 0){
                StudentSubject studentSubject = StudentSubject.builder()
                        .subject(subject)
                        .user(user)
                        .build();

                studentSubjectRepository.save(studentSubject);
            }
            else{
                TeacherSubject teacherSubject = TeacherSubject.builder()
                        .teacher(user)
                        .subject(subject)
                        .build();

                teacherSubjectRepository.save(teacherSubject).toResTeacherSubjectDefaultDTO();
            }
        }
    }

    public Boolean isModified() {
        User user = getCurrentUser();
        return user.getModDate() != null;
    }

    public void changeSuperSchool(Long schoolId) {
        User user = getCurrentUser();

        Optional<SchoolInformation> optionalSchoolInformation = schoolInformationRepository.findById(schoolId);
        if(optionalSchoolInformation.isEmpty()) throw new RuntimeException("No School");
        SchoolInformation schoolInformation = optionalSchoolInformation.get();

        user.setSchoolInformation(schoolInformation);

        userRepository.save(user);
    }
}
