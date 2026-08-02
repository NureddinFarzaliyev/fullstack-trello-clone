package com.frzlyv.trello_clone.features.user.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * LoginResponseDto
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
  private String token;
}
