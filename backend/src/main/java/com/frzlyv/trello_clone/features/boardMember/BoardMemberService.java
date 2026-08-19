package com.frzlyv.trello_clone.features.boardMember;

import java.util.List;
import java.util.UUID;

import com.frzlyv.trello_clone.features.boardMember.domain.BoardMemberDto;
import com.frzlyv.trello_clone.features.boardMember.domain.CreateBoardMemberDto;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;

/**
 * BoardMemberService
 */
public interface BoardMemberService {

  List<BoardMemberDto> getBoardMembers(UUID boardId);

  BoardMemberDto createBoardMember(UUID boardId, CreateBoardMemberDto body);

  void deleteBoardMember(UUID boardId, Long boardMemberId);

  BoardMemberDto acceptBoardMemberInvite(UUID boardId, UserEntity user);

}
