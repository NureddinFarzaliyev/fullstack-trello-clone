package com.frzlyv.trello_clone.features.boardMember;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.frzlyv.trello_clone.features.boardMember.domain.BoardMemberDto;
import com.frzlyv.trello_clone.features.boardMember.domain.CreateBoardMemberDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * BoardMemberController
 */
@RestController
@RequestMapping("/api/v1/boards/{boardId}/members")
@RequiredArgsConstructor
public class BoardMemberController {

  private final BoardMemberService boardMemberService;

  @GetMapping
  List<BoardMemberDto> getBoardMembers(@PathVariable UUID boardId) {
    return boardMemberService.getBoardMembers(boardId);
  }

  @PostMapping
  BoardMemberDto createBoardMember(@PathVariable UUID boardId, @Valid @RequestBody CreateBoardMemberDto body) {
    return boardMemberService.createBoardMember(boardId, body);
  }

  @DeleteMapping("/{boardMemberId}")
  void deleteBoardMember(@PathVariable UUID boardId, @PathVariable Long boardMemberId) {
    boardMemberService.deleteBoardMember(boardId, boardMemberId);
  }

}
