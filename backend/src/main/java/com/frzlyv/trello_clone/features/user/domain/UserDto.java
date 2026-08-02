package com.frzlyv.trello_clone.features.user.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * UserDto
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

  private Long id;

  private String username;

  private String email;

}
