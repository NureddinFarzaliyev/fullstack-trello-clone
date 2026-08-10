package com.frzlyv.trello_clone.features.board;

import com.frzlyv.trello_clone.shared.events.UserRegisterEvent;

/**
 * BoardService
 */
public interface BoardService {

  void initializeUserBoard(UserRegisterEvent event);

}
