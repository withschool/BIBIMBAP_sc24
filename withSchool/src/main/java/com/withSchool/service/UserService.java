package com.withSchool.service;

import com.withSchool.dto.SignUpDTO;
import com.withSchool.repository.UserRepository;
import com.withSchool.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void register(SignUpDTO signUpDTO) {
        // DTO에서 엔티티로 변환
        User user = User.builder()
                .email(signUpDTO.getEmail())
                .name(signUpDTO.getName())
                .sex(signUpDTO.getSex())
                .phoneNumber(signUpDTO.getPhoneNumber())
                .address(signUpDTO.getAddress())
                .birthDate(signUpDTO.getBirthDate())
                .accountType(signUpDTO.getAccountType())
                .userCode(signUpDTO.getUserCode())
                .parentCode(signUpDTO.getParentCode())
                .build();

        // 비밀번호 암호화
        String hashedPassword = passwordEncoder.encode(signUpDTO.getPassword());
        user.setPassword(hashedPassword);

        // 회원가입
        userRepository.save(user);
    }
}
