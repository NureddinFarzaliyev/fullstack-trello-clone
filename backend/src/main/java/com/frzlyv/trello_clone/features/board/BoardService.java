package com.frzlyv.trello_clone.features.board;

import java.util.List;
import java.util.UUID;

import com.frzlyv.trello_clone.features.board.domain.BoardDto;
import com.frzlyv.trello_clone.features.board.domain.BoardWithRoleDto;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;
import com.frzlyv.trello_clone.shared.events.UserRegisterEvent;

/**
 * BoardService
 */
public interface BoardService {

  void initializeUserBoard(UserRegisterEvent event);

  BoardDto getDefaultBoard(UserEntity user);

  BoardDto getBoardById(UUID boardId);

  List<BoardWithRoleDto> getAllBoards(UserEntity user);

}
