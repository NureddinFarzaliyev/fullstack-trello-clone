package com.frzlyv.trello_clone.features.column;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.frzlyv.trello_clone.features.column.domain.ColumnDto;
import com.frzlyv.trello_clone.features.column.domain.CreateColumnRequestDto;
import com.frzlyv.trello_clone.features.column.domain.UpdateColumnRequestDto;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;

/**
 * ColumnService
 */
public interface ColumnService {

  ColumnDto createColumn(UserEntity userEntity, UUID boardId, CreateColumnRequestDto body);

  Page<ColumnDto> getBoardColumns(UUID boardId, Pageable page);

  void deleteColumn(UUID boardId, Long columnId);

  ColumnDto updateColumn(UUID boardId, Long ColumnId, UpdateColumnRequestDto body);

}
