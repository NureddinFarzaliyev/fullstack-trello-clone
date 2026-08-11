package com.frzlyv.trello_clone.features.board.domain;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.frzlyv.trello_clone.shared.Mapper;

import lombok.RequiredArgsConstructor;

/**
 * BoardMapper
 */
@RequiredArgsConstructor
@Component
public class BoardMapper implements Mapper<BoardEntity, BoardDto> {

  private final ModelMapper modelMapper;

  @Override
  public BoardEntity toEntity(BoardDto dto) {
    return modelMapper.map(dto, BoardEntity.class);
  }

  @Override
  public BoardDto toDto(BoardEntity entity) {
    return modelMapper.map(entity, BoardDto.class);

  }

}
