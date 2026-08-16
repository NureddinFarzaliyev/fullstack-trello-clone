package com.frzlyv.trello_clone.features.column;

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
import jakarta.transaction.Transactional;
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

    Long nextPosition = columnRepository.findFirstByBoardIdOrderByPositionDesc(boardId)
        .map(ColumnEntity::getPosition)
        .orElse(0L) + 1;

    ColumnEntity columnEntity = ColumnEntity.builder()
        .board(board)
        .title(body.getTitle())
        .position(nextPosition)
        .build();

    ColumnEntity savedColumnEntity = columnRepository.save(columnEntity);

    return modelMapper.toDto(savedColumnEntity);
  }

  @Override
  @PreAuthorize("@boardSecurity.hasBoardAccess(#boardId)")
  public Page<ColumnDto> getBoardColumns(UUID boardId, Pageable pageable) {
    Page<ColumnEntity> columnEntities = columnRepository.findAllByBoardIdOrderByPositionAsc(boardId, pageable);
    return columnEntities.map(modelMapper::toDto);
  }

  @Override
  @PreAuthorize("@boardSecurity.hasBoardAccess(#boardId)")
  @Transactional
  public void deleteColumn(UUID boardId, Long columnId) {
    ColumnEntity column = columnRepository.deleteByIdAndBoardId(columnId, boardId)
        .orElse(null);
    if (column != null) {
      columnRepository.shiftPositionsLeft(boardId, column.getPosition());
    }
  }

  @Override
  @PreAuthorize("@boardSecurity.hasColumnAccess(#boardId, #columnId)")
  @Transactional
  public ColumnDto updateColumn(UUID boardId, Long columnId, UpdateColumnRequestDto body) {
    ColumnEntity columnEntity = columnRepository.findById(columnId)
        .orElseThrow(() -> new EntityNotFoundException());

    if (body.getTitle() != null) {
      columnEntity.setTitle(body.getTitle());
    }

    Long newPos = body.getPosition();
    if (newPos != null && !newPos.equals(columnEntity.getPosition())) {

      Long currentPos = columnEntity.getPosition();
      Long maxPos = columnRepository.findMaxPositionByBoardId(boardId);

      // [0, maxPos]
      newPos = Math.max(0L, Math.min(newPos, maxPos));

      if (!newPos.equals(currentPos)) {
        if (newPos < currentPos) {
          columnRepository.shiftPositionsRight(boardId, newPos, currentPos);
        } else {
          columnRepository.shiftPositionsLeft(boardId, currentPos, newPos);
        }

        columnEntity.setPosition(newPos);
      }

    }

    return modelMapper.toDto(columnEntity);
  }

}
