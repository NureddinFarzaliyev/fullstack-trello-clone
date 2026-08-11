package com.frzlyv.trello_clone.features.board;

import com.frzlyv.trello_clone.features.board.domain.BoardDto;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;
import com.frzlyv.trello_clone.shared.events.UserRegisterEvent;

/**
 * BoardService
 */
public interface BoardService {

  void initializeUserBoard(UserRegisterEvent event);

  BoardDto getDefaultBoard(UserEntity user);

}
