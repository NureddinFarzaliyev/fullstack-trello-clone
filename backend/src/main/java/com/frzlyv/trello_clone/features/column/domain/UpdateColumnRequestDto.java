package com.frzlyv.trello_clone.features.column.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * UpdateColumnRequestDto
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateColumnRequestDto {

  String title;
  Long position;

}
