package com.frzlyv.trello_clone.features.card.domain;

import java.sql.Date;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * CreateCardRequestDto
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCardRequestDto {

  @NotBlank(message = "Title cannot be blank.")
  String title;

  String description;

  Date due;

}
