package com.withSchool.service.user;

import com.withSchool.dto.user.ReqUserPasswordDTO;
import com.withSchool.dto.user.UserInfoDTO;
import com.withSchool.dto.user.UserUpdateDTO;
import com.withSchool.entity.user.User;
import com.withSchool.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserUpdateServiceImpl implements UserUpdateService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserInfoDTO getUserInfo(Long userId) {
        Optional<User> result = userRepository.findById(userId);
        if (result.isPresent()) {
            UserInfoDTO dto = EntityToDTO(result.get());
            return dto;
        }
        return null;
    }

    public void updateUserInfo(UserUpdateDTO dto) {
        Optional<User> result = userRepository.findById(dto.getUserId());
        if (result.isPresent()) {
            User user = result.get();
            user.changeUserInfo(dto.getEmail(), dto.getPhoneNumber(), dto.getAddress());
            userRepository.save(user);
        }
        else{
            throw new RuntimeException("해당유저가 없습니다");
        }

    }
    public void updateUserPassword(ReqUserPasswordDTO dto){
        Optional<User> user1 = userRepository.findById(dto.getUserId());
        if(user1.isPresent()){
            User user = user1.get();
            user.changeUserPassword(passwordEncoder.encode(dto.getPassword()));
            userRepository.save(user);
        }
        else{
            throw new RuntimeException("해당유저가 없습니다");
        }
    }
}
