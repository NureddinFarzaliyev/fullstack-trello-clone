package com.frzlyv.trello_clone.features.board.domain;

import java.util.UUID;

import com.frzlyv.trello_clone.features.boardMember.domain.BoardRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * BoardWithRoleDto
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardWithRoleDto {
  UUID id;
  Boolean isPublic;
  String title;
  BoardRole role;
}
