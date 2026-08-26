package com.frzlyv.trello_clone.features.boardMember;

import java.util.List;
import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.frzlyv.trello_clone.features.board.BoardRepository;
import com.frzlyv.trello_clone.features.board.domain.BoardEntity;
import com.frzlyv.trello_clone.features.boardMember.domain.BoardMemberDto;
import com.frzlyv.trello_clone.features.boardMember.domain.BoardMemberEntity;
import com.frzlyv.trello_clone.features.boardMember.domain.BoardRole;
import com.frzlyv.trello_clone.features.boardMember.domain.CreateBoardMemberDto;
import com.frzlyv.trello_clone.features.user.UserRepository;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;
import com.frzlyv.trello_clone.features.ws.domain.BoardEventPayloadDto;
import com.frzlyv.trello_clone.features.ws.domain.BoardEventPayloadType;
import com.frzlyv.trello_clone.shared.Mapper;
import com.frzlyv.trello_clone.shared.exceptions.UserAlreadyExistsException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

/**
 * BoardMemberServiceImpl
 */
@Service
@RequiredArgsConstructor
public class BoardMemberServiceImpl implements BoardMemberService {

  private final BoardMemberRepository boardMemberRepository;
  private final UserRepository userRepository;
  private final BoardRepository boardRepository;
  private final Mapper<BoardMemberEntity, BoardMemberDto> modelMapper;
  private final SimpMessagingTemplate simpMessagingTemplate;

  @Override
  @PreAuthorize("@boardSecurity.hasBoardAccess(#boardId)")
  public List<BoardMemberDto> getBoardMembers(UUID boardId) {
    List<BoardMemberEntity> boardMemberEntities = boardMemberRepository.findAllByBoardId(boardId);
    return boardMemberEntities.stream().map(modelMapper::toDto).toList();
  }

  @Override
  @PreAuthorize("@boardSecurity.hasBoardOwnerAccess(#boardId)")
  @Transactional
  public BoardMemberDto createBoardMember(UUID boardId, CreateBoardMemberDto body) {
    UserEntity userEntity = userRepository.findByEmail(body.getEmail())
        .orElseThrow(() -> new EntityNotFoundException("This user does not exist."));

    BoardEntity boardProxy = boardRepository.getReferenceById(boardId);

    BoardMemberEntity boardMember = BoardMemberEntity.builder()
        .user(userEntity)
        .board(boardProxy)
        .role(BoardRole.PENDING)
        .build();

    BoardMemberEntity savedBoardMember;

    try {
      savedBoardMember = boardMemberRepository.save(boardMember);
    } catch (DataIntegrityViolationException e) {
      throw new UserAlreadyExistsException("This user is already a member.");
    }

    BoardMemberDto savedBoardMemberDto = modelMapper.toDto(savedBoardMember);

    simpMessagingTemplate.convertAndSend("/queue/invitations/" + body.getEmail(),
        new BoardEventPayloadDto<BoardMemberDto>(savedBoardMemberDto, BoardEventPayloadType.INVITATION_CREATE));
    simpMessagingTemplate.convertAndSend("/topic/board/" + boardId,
        new BoardEventPayloadDto<BoardMemberDto>(savedBoardMemberDto, BoardEventPayloadType.MEMBER_CREATE));

    return savedBoardMemberDto;
  }

  @Override
  @PreAuthorize("@boardSecurity.hasBoardOwnerAccess(#boardId)")
  @Transactional
  public void deleteBoardMember(UUID boardId, Long boardMemberId) {
    BoardMemberEntity boardMemberEntity = boardMemberRepository.findById(boardMemberId)
        .orElseThrow(() -> new EntityNotFoundException("Board member not found"));

    BoardMemberDto boardMemberDto = modelMapper.toDto(boardMemberEntity);

    simpMessagingTemplate.convertAndSend("/queue/invitations/" + boardMemberEntity.getUser().getEmail(),
        new BoardEventPayloadDto<BoardMemberDto>(boardMemberDto, BoardEventPayloadType.INVITATION_DELETE));
    simpMessagingTemplate.convertAndSend("/topic/board/" + boardId,
        new BoardEventPayloadDto<BoardMemberDto>(boardMemberDto, BoardEventPayloadType.MEMBER_DELETE));

    boardMemberRepository.deleteByIdAndBoardId(boardMemberId, boardId);
  }

  @Override
  public BoardMemberDto acceptBoardMemberInvite(UUID boardId, UserEntity user) {
    BoardMemberEntity boardMemberEntity = boardMemberRepository.findByBoardIdAndUserIdAndRole(boardId, user.getId(),
        BoardRole.PENDING).orElseThrow(() -> new EntityNotFoundException("Invitation not found"));

    boardMemberEntity.setRole(BoardRole.EDITOR);
    BoardMemberEntity saved = boardMemberRepository.save(boardMemberEntity);
    BoardMemberDto boardMemberDto = modelMapper.toDto(saved);

    simpMessagingTemplate.convertAndSend("/topic/board/" + boardId,
        new BoardEventPayloadDto<BoardMemberDto>(boardMemberDto, BoardEventPayloadType.MEMBER_PATCH));

    return boardMemberDto;
  }

  @Override
  @Transactional
  public BoardMemberDto declineBoardMemberInvite(UUID boardId, UserEntity user) {
    BoardMemberEntity boardMemberEntity = boardMemberRepository.deleteByBoardIdAndUserIdAndRole(boardId, user.getId(),
        BoardRole.PENDING).orElseThrow(() -> new EntityNotFoundException("Invitation not found."));

    BoardMemberDto boardMemberDto = modelMapper.toDto(boardMemberEntity);

    simpMessagingTemplate.convertAndSend("/topic/board/" + boardId,
        new BoardEventPayloadDto<BoardMemberDto>(boardMemberDto, BoardEventPayloadType.MEMBER_DELETE));

    return boardMemberDto;
  }

}
