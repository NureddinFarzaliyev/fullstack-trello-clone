package com.frzlyv.trello_clone.features.board;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.frzlyv.trello_clone.features.board.domain.BoardDto;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;

import lombok.RequiredArgsConstructor;

/**
 * BoardController
 */
@RestController
@RequestMapping("/api/v1/boards")
@RequiredArgsConstructor
public class BoardController {

  private final BoardService boardService;

  @GetMapping("/default")
  BoardDto getDefaultBoard(@AuthenticationPrincipal UserEntity userEntity) {
    return boardService.getDefaultBoard(userEntity);
  }

}
