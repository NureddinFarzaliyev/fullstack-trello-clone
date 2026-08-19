package com.frzlyv.trello_clone.features.board;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.frzlyv.trello_clone.features.board.domain.BoardDto;
import com.frzlyv.trello_clone.features.board.domain.BoardWithRoleDto;
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

  @GetMapping
  List<BoardWithRoleDto> getAllBoards(@AuthenticationPrincipal UserEntity userEntity) {
    return boardService.getAllBoards(userEntity);
  }

  @GetMapping("/default")
  BoardDto getDefaultBoard(@AuthenticationPrincipal UserEntity userEntity) {
    return boardService.getDefaultBoard(userEntity);
  }

  @GetMapping("/{boardId}")
  BoardWithRoleDto getBoardById(@PathVariable UUID boardId, @AuthenticationPrincipal UserEntity userEntity) {
    return boardService.getBoardById(boardId, userEntity);
  }

}
