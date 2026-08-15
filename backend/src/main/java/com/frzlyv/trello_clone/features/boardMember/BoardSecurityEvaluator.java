package com.frzlyv.trello_clone.features.boardMember;

import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.frzlyv.trello_clone.features.column.ColumnRepository;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;

import lombok.RequiredArgsConstructor;

/**
 * BoardSecurityEvaluator
 */
@Component("boardSecurity")
@RequiredArgsConstructor
public class BoardSecurityEvaluator {

  private final BoardMemberRepository boardMemberRepository;
  private final ColumnRepository columnRepository;

  public boolean hasBoardAccess(UUID boardId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      return false;
    }

    UserEntity user = (UserEntity) authentication.getPrincipal();
    return boardMemberRepository.existsByBoardIdAndUserId(boardId, user.getId());
  }

  public boolean hasColumnAccess(UUID boardId, Long columnId) {
    if (!hasBoardAccess(boardId)) {
      return false;
    }

    return columnRepository.existsByIdAndBoardId(columnId, boardId);
  }

}
