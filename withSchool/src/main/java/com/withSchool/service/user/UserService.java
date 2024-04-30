package com.withSchool.service.user;

import com.withSchool.dto.school.SchoolInformationDTO;
import com.withSchool.dto.user.SignUpDTO;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.entity.user.User;
import com.withSchool.repository.school.SchoolInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final SchoolInformationRepository schoolInformationRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User findById(String id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
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
    public void registerAdmin(SchoolInformationDTO dto) throws Exception{
        Optional<SchoolInformation> result = schoolInformationRepository.findByAtptOfcdcScCodeAndSdSchulCode(dto.getATPT_OFCDC_SC_CODE(),dto.getSD_SCHUL_CODE());
        if(result.isPresent()) {
            SchoolInformation schoolInformation = result.get();
            User admin = User.builder()
                    .id(schoolInformation.getSdSchulCode() + " admin")
                    .password("1234")  // 초기 비밀번호 설정이여서 암호화 필요없을듯
                    .name("관리자")
                    .accountType(3)
                    .schoolInformation(schoolInformation)
                    .build();
            userRepository.save(admin);
        }
    }

    public void register(SignUpDTO signUpDTO) {
        // 중복된 아이디 체크
        if (userRepository.existsById(signUpDTO.getId())) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

        // DTO에서 엔티티로 변환
        User user = User.builder()
                .id(signUpDTO.getId())
                .email(signUpDTO.getEmail())
                .name(signUpDTO.getName())
                .sex(signUpDTO.getSex())
                .phoneNumber(signUpDTO.getPhoneNumber())
                .address(signUpDTO.getAddress())
                .birthDate(signUpDTO.getBirthDate())
                .accountType(signUpDTO.getAccountType())
                .userCode(signUpDTO.getUserCode())
                .parentCode(signUpDTO.getParentCode())
                .password(passwordEncoder.encode(signUpDTO.getPassword()))
                .build();

        // 회원가입
        userRepository.save(user);
    }


    @Transactional
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
}
