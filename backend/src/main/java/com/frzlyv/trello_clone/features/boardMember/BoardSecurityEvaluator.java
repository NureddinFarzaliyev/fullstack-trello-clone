package com.frzlyv.trello_clone.features.boardMember;

import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.frzlyv.trello_clone.features.boardMember.domain.BoardRole;
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

  private UserEntity getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      return null;
    }

    return (UserEntity) authentication.getPrincipal();
  }

  public boolean hasBoardAccess(UUID boardId) {
    UserEntity user = getCurrentUser();
    if (user == null) {
      return false;
    }

    Boolean isPending = boardMemberRepository.existsByBoardIdAndUserIdAndRole(boardId, user.getId(), BoardRole.PENDING);
    if (isPending) {
      return false;
    }

    return boardMemberRepository.existsByBoardIdAndUserId(boardId, user.getId());
  }

  public boolean hasBoardOwnerAccess(UUID boardId) {
    UserEntity user = getCurrentUser();
    if (user == null) {
      return false;
    }

    return boardMemberRepository.existsByBoardIdAndUserIdAndRole(boardId, user.getId(), BoardRole.OWNER);
  }

  public boolean hasColumnAccess(UUID boardId, Long columnId) {
    if (!hasBoardAccess(boardId)) {
      return false;
    }

    return columnRepository.existsByIdAndBoardId(columnId, boardId);
  }

}
