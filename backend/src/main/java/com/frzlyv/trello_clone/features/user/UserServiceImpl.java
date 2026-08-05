package com.frzlyv.trello_clone.features.user;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.frzlyv.trello_clone.features.user.domain.LoginDto;
import com.frzlyv.trello_clone.features.user.domain.LoginResponseDto;
import com.frzlyv.trello_clone.features.user.domain.RegisterDto;
import com.frzlyv.trello_clone.features.user.domain.UserDto;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;
import com.frzlyv.trello_clone.security.JwtService;
import com.frzlyv.trello_clone.shared.Mapper;
import com.frzlyv.trello_clone.shared.exceptions.UserAlreadyExistsException;

import lombok.RequiredArgsConstructor;

/**
 * UserServiceImpl
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final Mapper<UserEntity, UserDto> userMapper;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;

  @Override
  public UserDto register(RegisterDto registerDto) {
    if (userRepository.existsByEmail(registerDto.getEmail())) {
      throw new UserAlreadyExistsException("User with this email already exists.");
    }

    if (userRepository.existsByUsername(registerDto.getUsername())) {
      throw new UserAlreadyExistsException("User with this username already exists.");
    }

    UserEntity userEntity = UserEntity.builder()
        .username(registerDto.getUsername())
        .email(registerDto.getEmail())
        .password(passwordEncoder.encode(registerDto.getPassword()))
        .build();

    UserEntity savedUser = userRepository.save(userEntity);
    return userMapper.toDto(savedUser);
  }

  @Override
  public LoginResponseDto login(LoginDto loginDto) {
    authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

    String token = jwtService.generateToken(loginDto.getEmail());
    return LoginResponseDto.builder()
        .token(token)
        .build();
  }

  @Override
  public UserDto me(UserEntity userEntity) {
    return userMapper.toDto(userEntity);
  }

}
