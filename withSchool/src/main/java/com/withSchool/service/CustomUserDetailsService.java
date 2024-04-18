package com.withSchool.service;

import com.withSchool.entity.User;
import com.withSchool.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


// 사용자 정보를 가지고 불러오는 class
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        return userRepository.findById(id)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 회원을 찾을 수 없습니다."));
    }

    private UserDetails createUserDetails(User user) {
        String auth = "";
        if (user.getAccountType() == 0) auth = "STUDENT";
        else if (user.getAccountType() == 1) auth = "PARENT";
        else if (user.getAccountType() == 2) auth = "TEACHER";
        else if (user.getAccountType() == 3) auth = "ADMIN";
        else if (user.getAccountType() == 4) auth = "SUPER";

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getId())
                .password(user.getPassword())
                .roles(auth)
                .build();
    }
}
