package com.frzlyv.trello_clone.features.board;

import java.util.List;
import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.frzlyv.trello_clone.features.board.domain.BoardDto;
import com.frzlyv.trello_clone.features.board.domain.BoardEntity;
import com.frzlyv.trello_clone.features.board.domain.BoardWithRoleDto;
import com.frzlyv.trello_clone.features.boardMember.BoardMemberRepository;
import com.frzlyv.trello_clone.features.boardMember.BoardMemberService;
import com.frzlyv.trello_clone.features.boardMember.domain.BoardMemberEntity;
import com.frzlyv.trello_clone.features.boardMember.domain.BoardRole;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;
import com.frzlyv.trello_clone.shared.Mapper;
import com.frzlyv.trello_clone.shared.events.UserRegisterEvent;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

/**
 * BoardServiceImpl
 */
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

  private final BoardRepository boardRepository;
  private final BoardMemberRepository boardMemberRepository;
  private final Mapper<BoardEntity, BoardDto> modelMapper;

  @Override
  @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void initializeUserBoard(UserRegisterEvent event) {

    BoardEntity board = BoardEntity.builder()
        .title(event.getUserEntity().getUsername() + "'s Default Board")
        .build();

    BoardEntity savedBoard = boardRepository.save(board);

    BoardMemberEntity boardMember = BoardMemberEntity.builder()
        .board(savedBoard)
        .user(event.getUserEntity())
        .role(BoardRole.OWNER)
        .build();

    boardMemberRepository.save(boardMember);
  }

  @Override
  public BoardDto getDefaultBoard(UserEntity user) {
    BoardMemberEntity boardMemberEntity = boardMemberRepository.findOneByUserId(user.getId())
        .orElseThrow(() -> new EntityNotFoundException("Board not found."));

    BoardEntity boardEntity = boardRepository.findById(boardMemberEntity.getBoard().getId())
        .orElseThrow(() -> new EntityNotFoundException("Board not found."));

    return modelMapper.toDto(boardEntity);
  }

  @Override
  @PreAuthorize("@boardSecurity.hasBoardAccess(#boardId)")
  public BoardWithRoleDto getBoardById(UUID boardId, UserEntity user) {
    BoardEntity boardEntity = boardRepository.findById(boardId)
        .orElseThrow(() -> new EntityNotFoundException("Board not found."));

    BoardMemberEntity boardMemberEntity = boardMemberRepository
        .findByUserIdAndBoardIdWithBoard(user.getId(), boardId)
        .orElseThrow(() -> new EntityNotFoundException("Board member not found."));

    return BoardWithRoleDto.builder()
        .id(boardEntity.getId())
        .title(boardEntity.getTitle())
        .isPublic(boardEntity.getIsPublic())
        .role(boardMemberEntity.getRole())
        .build();
  }

  @Override
  public List<BoardWithRoleDto> getAllBoards(UserEntity user) {
    List<BoardMemberEntity> boardMemberEntities = boardMemberRepository.findAllByUserIdWithBoard(user.getId());
    List<BoardWithRoleDto> boardWithRoleDtos = boardMemberEntities.stream().map(e -> BoardWithRoleDto.builder()
        .title(e.getBoard().getTitle())
        .id(e.getBoard().getId())
        .isPublic(e.getBoard().getIsPublic())
        .role(e.getRole())
        .build()).toList();
    return boardWithRoleDtos;
  }

}
