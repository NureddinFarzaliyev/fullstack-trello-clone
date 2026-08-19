package com.frzlyv.trello_clone.features.boardMember.domain;

import java.util.UUID;

import com.frzlyv.trello_clone.features.user.domain.UserDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * BoardMemberDto
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardMemberDto {

  Long id;
  UserDto user;
  UUID boardId;
  BoardRole role;

}
