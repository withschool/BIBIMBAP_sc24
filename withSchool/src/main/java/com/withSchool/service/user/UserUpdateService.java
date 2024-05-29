package com.withSchool.service.user;

import com.withSchool.dto.user.ReqUserPasswordDTO;
import com.withSchool.dto.user.UserInfoDTO;
import com.withSchool.dto.user.UserUpdateDTO;
import com.withSchool.entity.user.User;

public interface UserUpdateService {
    UserInfoDTO getUserInfo(Long userId); // 서버에서 사용자 기본 정보 클라이언트로 가져오기

    void updateUserInfo(UserUpdateDTO dto);

    void updateUserPassword(ReqUserPasswordDTO dto);

    default User DtoToEntity(UserUpdateDTO dto) { // 클라이언트에서 받은 수정된 정보DTO들을 엔티티로 변환
        User user = User.builder()
                .userId(dto.getUserId())
                .email(dto.getEmail())
                .phoneNumber(dto.getPhoneNumber())
                .address(dto.getAddress())
                .build();
        return user;
    }

    default UserInfoDTO EntityToDTO(User user) {
        UserInfoDTO userInfoDTO = UserInfoDTO.builder()
                .userId(user.getUserId())
                .id(user.getId())
                .password(user.getPassword())
                .email(user.getEmail())
                .name(user.getName())
                .sex(user.getSex())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .birthDate(user.getBirthDate())
                .accountType(user.getAccountType())
                .build();
        return userInfoDTO;
    }


}
