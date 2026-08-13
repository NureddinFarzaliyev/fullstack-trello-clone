package com.frzlyv.trello_clone.features.column;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.frzlyv.trello_clone.features.board.BoardRepository;
import com.frzlyv.trello_clone.features.board.domain.BoardEntity;
import com.frzlyv.trello_clone.features.column.domain.ColumnDto;
import com.frzlyv.trello_clone.features.column.domain.ColumnEntity;
import com.frzlyv.trello_clone.features.column.domain.CreateColumnRequestDto;
import com.frzlyv.trello_clone.features.column.domain.UpdateColumnRequestDto;
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

  @Override
  @PreAuthorize("@boardSecurity.hasBoardAccess(#boardId)")
  public Page<ColumnDto> getBoardColumns(UUID boardId, Pageable pageable) {
    Page<ColumnEntity> columnEntities = columnRepository.findAllByBoardId(boardId, pageable);
    return columnEntities.map(modelMapper::toDto);
  }

  @Override
  @PreAuthorize("@boardSecurity.hasBoardAccess(#boardId)")
  public void deleteColumn(UUID boardId, Long columnId) {
    columnRepository.deleteById(columnId);
  }

  @Override
  @PreAuthorize("@boardSecurity.hasBoardAccess(#boardId)")
  public ColumnDto updateColumn(UUID boardId, Long ColumnId, UpdateColumnRequestDto body) {
    ColumnEntity columnEntity = columnRepository.findById(ColumnId)
        .orElseThrow(() -> new EntityNotFoundException());

    if (body.getTitle() != null) {
      columnEntity.setTitle(body.getTitle());
    }

    if (body.getPosition() != null) {
      columnEntity.setPosition(body.getPosition());
    }

    ColumnEntity updatedColumnEntity = columnRepository.save(columnEntity);
    return modelMapper.toDto(updatedColumnEntity);
  }

}
