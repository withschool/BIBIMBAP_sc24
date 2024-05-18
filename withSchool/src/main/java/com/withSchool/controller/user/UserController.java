package com.withSchool.controller.user;

import com.withSchool.dto.user.BasicUserInfoDTO;
import com.withSchool.dto.user.ResUserDefaultDTO;
import com.withSchool.entity.user.User;
import com.withSchool.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

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
}
