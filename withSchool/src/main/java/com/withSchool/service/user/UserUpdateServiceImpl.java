package com.withSchool.service.user;

import com.withSchool.dto.file.FileDTO;
import com.withSchool.dto.file.FileDeleteDTO;
import com.withSchool.dto.user.ReqUserPasswordDTO;
import com.withSchool.dto.user.UserInfoDTO;
import com.withSchool.dto.user.UserUpdateDTO;
import com.withSchool.entity.user.User;
import com.withSchool.entity.user.UserImgFile;
import com.withSchool.repository.user.UserImgFileRepository;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.file.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserUpdateServiceImpl implements UserUpdateService {
    private final UserService userService;
    private final FileService fileService;
    private final UserRepository userRepository;
    private final UserImgFileRepository userImgFileRepository;
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
    @Transactional
    public void updateUserImg(MultipartFile file){
        User user = userService.getCurrentUser();
        Optional<UserImgFile> result = userImgFileRepository.findByUserId(user.getUserId());

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("파일이 비어 있습니다.");
        }

        FileDTO fileDTO = FileDTO.builder()
                .file(file)
                .repoType("userImg")
                .masterId(user.getUserId())
                .build();

        if(result.isPresent()){ // 이미지가 있는 경우
            FileDeleteDTO fileDeleteDTO = FileDeleteDTO.builder()
                    .savedName(result.get().getSavedName())
                    .repoType("userImg")
                    .masterId(user.getUserId())
                    .build();
            fileService.deleteFile(fileDeleteDTO);
            fileService.saveFile(fileDTO);
        }
        else{ // 이미지가 없는 경우
            fileService.saveFile(fileDTO);
        }
    }
}
