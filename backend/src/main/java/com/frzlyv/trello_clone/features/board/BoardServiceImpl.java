package com.frzlyv.trello_clone.features.board;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.frzlyv.trello_clone.features.board.domain.BoardEntity;
import com.frzlyv.trello_clone.features.boardMember.BoardMemberRepository;
import com.frzlyv.trello_clone.features.boardMember.domain.BoardMemberEntity;
import com.frzlyv.trello_clone.features.boardMember.domain.BoardRole;
import com.frzlyv.trello_clone.shared.events.UserRegisterEvent;

import lombok.RequiredArgsConstructor;

/**
 * BoardServiceImpl
 */
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

  private final BoardRepository boardRepository;
  private final BoardMemberRepository boardMemberRepository;

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

}
