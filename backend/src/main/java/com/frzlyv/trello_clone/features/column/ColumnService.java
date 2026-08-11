package com.frzlyv.trello_clone.features.column;

import java.util.UUID;

import com.frzlyv.trello_clone.features.column.domain.ColumnDto;
import com.frzlyv.trello_clone.features.column.domain.CreateColumnRequestDto;
import com.frzlyv.trello_clone.features.user.domain.UserEntity;

/**
 * ColumnService
 */
public interface ColumnService {

  ColumnDto createColumn(UserEntity userEntity, UUID boardId, CreateColumnRequestDto body);

}
