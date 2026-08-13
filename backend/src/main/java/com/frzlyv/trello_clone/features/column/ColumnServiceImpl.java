package com.frzlyv.trello_clone.features.column;

import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.frzlyv.trello_clone.features.board.BoardRepository;
import com.frzlyv.trello_clone.features.board.domain.BoardEntity;
import com.frzlyv.trello_clone.features.column.domain.ColumnDto;
import com.frzlyv.trello_clone.features.column.domain.ColumnEntity;
import com.frzlyv.trello_clone.features.column.domain.CreateColumnRequestDto;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;
import com.frzlyv.trello_clone.shared.Mapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

/**
 * ColumnServiceImpl
 */
@Service
@RequiredArgsConstructor
public class ColumnServiceImpl implements ColumnService {

  private final ColumnRepository columnRepository;
  private final BoardRepository boardRepository;
  private final Mapper<ColumnEntity, ColumnDto> modelMapper;

  @Override
  @PreAuthorize("@boardSecurity.hasBoardAccess(#boardId)")
  public ColumnDto createColumn(UserEntity userEntity, UUID boardId, CreateColumnRequestDto body) {
    BoardEntity board = boardRepository.findById(boardId)
        .orElseThrow(() -> new EntityNotFoundException());

    ColumnEntity columnEntity = ColumnEntity.builder()
        .board(board)
        .title(body.getTitle())
        .position(body.getPosition())
        .build();

    ColumnEntity savedColumnEntity = columnRepository.save(columnEntity);

    return modelMapper.toDto(savedColumnEntity);
  }

}
