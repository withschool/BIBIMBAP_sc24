package com.withSchool.service;

import com.withSchool.DTO.SignUpDTO;
import com.withSchool.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.withSchool.JWT.JwtToken;
import com.withSchool.JWT.JwtTokenProvider;
import com.withSchool.repository.UserRepository;
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
public class UserService {
    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;


    @Autowired
    private PasswordEncoder passwordEncoder;

    public User findById(String id){
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public User findByUsername(String username){
        Optional<User> user = userRepository.findByName(username);
        return user.orElse(null);
    }
    public User findByEmail(String email){
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElse(null);
    }
    public void register(SignUpDTO signUpDTO) {
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
