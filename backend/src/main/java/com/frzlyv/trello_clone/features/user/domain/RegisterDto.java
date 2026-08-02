package com.frzlyv.trello_clone.features.user.domain;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * RegisterDto
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {

  @NotBlank(message = "Email is required")
  @Email(message = "Invalid email format")
  private String email;

  @NotBlank(message = "Password is required")
  @Size(min = 8, message = "Password should be at least 8 symbols")
  private String password;

  @NotBlank(message = "Username is required")
  private String username;

}
