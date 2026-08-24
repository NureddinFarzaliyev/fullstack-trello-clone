package com.frzlyv.trello_clone.features.card.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * UpdateCardRequestDto
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCardRequestDto {

  String title;
  String description;
  Long columnId;
  Date due;
  Long position;
  Boolean completed;

}
