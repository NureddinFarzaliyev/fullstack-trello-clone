package com.frzlyv.trello_clone.features.column.domain;

import java.util.List;
import java.util.UUID;

import com.frzlyv.trello_clone.features.card.domain.CardDto;

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
  List<CardDto> cards;

}
