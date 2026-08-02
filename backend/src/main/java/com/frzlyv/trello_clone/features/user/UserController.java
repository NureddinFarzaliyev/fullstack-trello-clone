package com.frzlyv.trello_clone.features.user;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.frzlyv.trello_clone.features.user.domain.LoginDto;
import com.frzlyv.trello_clone.features.user.domain.LoginResponseDto;
import com.frzlyv.trello_clone.features.user.domain.RegisterDto;
import com.frzlyv.trello_clone.features.user.domain.UserDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * UserController
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @PostMapping("/register")
  UserDto register(@RequestBody @Valid RegisterDto registerDto) {
    return userService.register(registerDto);
  }

  @PostMapping("/login")
  LoginResponseDto login(@RequestBody @Valid LoginDto loginDto) {
    return userService.login(loginDto);
  }

}
