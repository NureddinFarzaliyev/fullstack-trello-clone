package com.frzlyv.trello_clone.features.user;

import org.springframework.stereotype.Service;

import com.frzlyv.trello_clone.features.user.domain.LoginDto;
import com.frzlyv.trello_clone.features.user.domain.LoginResponseDto;
import com.frzlyv.trello_clone.features.user.domain.RegisterDto;
import com.frzlyv.trello_clone.features.user.domain.UserDto;

/**
 * UserService
 */
@Service
public interface UserService {

  UserDto register(RegisterDto registerDto);

  LoginResponseDto login(LoginDto loginDto);

}
