package com.withSchool.service;

import com.withSchool.DTO.UserInfoDTO;
import com.withSchool.DTO.UserUpdateDTO;
import com.withSchool.entity.User;
import com.withSchool.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserUpdateServiceImpl implements UserUpdateService{
    private final UserRepository userRepository;

    public UserInfoDTO getUserInfo(Long userId){
        Optional<User> result = userRepository.findById(userId);
        if(result.isPresent()){
            UserInfoDTO dto = EntityToDTO(result.get());
            return dto;
        }
        return null;
    }
    public void updateUserInfo(UserUpdateDTO dto){
        Optional<User> result = userRepository.findById(dto.getUserId());
        if(result.isPresent()){
            User user = result.get();
            user.changeUserInfo(dto.getId(),dto.getPassword(), dto.getEmail(), dto.getPhoneNumber(),dto.getAddress());
            userRepository.save(user);
        }
    }
}
