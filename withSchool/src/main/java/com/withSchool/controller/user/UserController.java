package com.withSchool.controller.user;

import com.withSchool.dto.user.BasicUserInfoDTO;
import com.withSchool.dto.user.ReqUserPasswordDTO;
import com.withSchool.dto.user.ResUserDefaultDTO;
import com.withSchool.dto.user.UserUpdateDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.user.UserService;
import com.withSchool.service.user.UserUpdateService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserUpdateService userUpdateService;

    @GetMapping("/id/{id}")
    @Operation(summary = "유저의 ID를 가지고 유저 찾는 API")
    public ResponseEntity<BasicUserInfoDTO> findUserByUserName(@PathVariable("id") String id) {
        User user = userService.findById(id);
        return ResponseEntity.ok().body(user.entityToBasicUserInfoDTO());
    }

    @GetMapping("/user-id/{userPk}")
    @Operation(summary = "유저의 PK를 가지고 유저 찾는 API")
    public ResponseEntity<BasicUserInfoDTO> findUserByUserId(@PathVariable("userPk") Long userId) {
        User user = userService.findByUserId(userId);
        return ResponseEntity.ok().body(user.entityToBasicUserInfoDTO());
    }

    @PatchMapping("")
    @Operation(summary = "유저의 정보를 수정하는 API")
    public ResponseEntity<String> updateUserInfo(@RequestBody UserUpdateDTO dto){
        userUpdateService.updateUserInfo(dto);

        return ResponseEntity.ok().body("update success");
    }
    @PatchMapping("/password")
    @Operation(summary = "유저의 비밀번호를 수정하는 API")
    public ResponseEntity<String> updateUserPassword(@RequestBody ReqUserPasswordDTO dto){
        userUpdateService.updateUserPassword(dto);

        return ResponseEntity.ok().body("update success");
    }
}
