package com.frzlyv.trello_clone.features.card.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * CardDto
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardDto {

  Long id;
  String title;
  String description;
  Long position;
  Date due;
  Boolean completed;
  Long columnId;

}
