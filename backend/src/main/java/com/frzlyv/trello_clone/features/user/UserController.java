package com.frzlyv.trello_clone.features.user;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.frzlyv.trello_clone.features.user.domain.LoginDto;
import com.frzlyv.trello_clone.features.user.domain.LoginResponseDto;
import com.frzlyv.trello_clone.features.user.domain.RegisterDto;
import com.frzlyv.trello_clone.features.user.domain.UserDto;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;

import jakarta.servlet.http.HttpServletResponse;
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
  ResponseEntity<Void> login(@RequestBody @Valid LoginDto loginDto, HttpServletResponse response) {
    LoginResponseDto loginResponseDto = userService.login(loginDto);
    ResponseCookie cookie = ResponseCookie.from("jwt", loginResponseDto.getToken())
        .httpOnly(true)
        .secure(true)
        .path("/")
        .maxAge(24 * 60 * 60)
        .sameSite("none")
        .build();

    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    return ResponseEntity.ok().build();
  }

  @GetMapping("/me")
  UserDto me(@AuthenticationPrincipal UserEntity userEntity) {
    return userService.me(userEntity);
  }

  @GetMapping("/logout")
  ResponseEntity<Void> logout(HttpServletResponse response) {
    ResponseCookie cookie = ResponseCookie.from("jwt", "")
        .httpOnly(true)
        .secure(true)
        .path("/")
        .maxAge(0)
        .sameSite("none")
        .build();

    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    return ResponseEntity.ok().build();
  }

}
