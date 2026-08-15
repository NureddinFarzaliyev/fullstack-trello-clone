package com.frzlyv.trello_clone.features.card.domain;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.frzlyv.trello_clone.shared.Mapper;

import lombok.RequiredArgsConstructor;

/**
 * CardMapper
 */
@Component
@RequiredArgsConstructor
public class CardMapper implements Mapper<CardEntity, CardDto> {

  private final ModelMapper modelMapper;

  @Override
  public CardEntity toEntity(CardDto dto) {
    return modelMapper.map(dto, CardEntity.class);
  }

  @Override
  public CardDto toDto(CardEntity entity) {
    return modelMapper.map(entity, CardDto.class);
  }

}
