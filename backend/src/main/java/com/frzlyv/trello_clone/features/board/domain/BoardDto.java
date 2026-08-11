package com.frzlyv.trello_clone.features.board.domain;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * BoardSummaryDto
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {

  UUID id;
  Boolean isPublic;
  String title;

}
