package com.frzlyv.trello_clone.features.column.domain;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ColumnDto
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ColumnDto {

  Long id;
  String title;
  Long position;
  UUID boardId;

}
