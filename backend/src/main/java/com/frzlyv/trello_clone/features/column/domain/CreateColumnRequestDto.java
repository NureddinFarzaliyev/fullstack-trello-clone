package com.frzlyv.trello_clone.features.column.domain;

import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * CreateColumnRequestDto
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateColumnRequestDto {

  @NotBlank(message = "Title cannot be blank.")
  String title;

  @Min(value = 1l, message = "Position shuold be at least one.")
  @Builder.Default
  Long position = 1l;

}
