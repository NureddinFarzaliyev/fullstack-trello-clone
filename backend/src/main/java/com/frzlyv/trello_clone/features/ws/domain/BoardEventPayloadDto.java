package com.frzlyv.trello_clone.features.ws.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * BoardEventPayloadDto
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardEventPayloadDto<T> {

  T data;
  BoardEventPayloadType type;

}
