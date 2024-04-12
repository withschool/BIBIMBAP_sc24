package com.withSchool.service;

import com.withSchool.JWT.JwtToken;
import com.withSchool.JWT.JwtTokenProvider;
import com.withSchool.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

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
