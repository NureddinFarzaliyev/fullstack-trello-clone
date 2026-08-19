package com.frzlyv.trello_clone.features.boardMember.domain;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * CreateBoardMemberDto
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateBoardMemberDto {
  @Email(message = "Email should be valid")
  String email;
}
