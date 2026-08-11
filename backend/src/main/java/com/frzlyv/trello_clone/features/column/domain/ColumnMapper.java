package com.frzlyv.trello_clone.features.column.domain;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.frzlyv.trello_clone.shared.Mapper;

import lombok.RequiredArgsConstructor;

/**
 * ColumnMapper
 */
@RequiredArgsConstructor
@Component
public class ColumnMapper implements Mapper<ColumnEntity, ColumnDto> {

  private final ModelMapper modelMapper;

  @Override
  public ColumnDto toDto(ColumnEntity entity) {
    return modelMapper.map(entity, ColumnDto.class);
  }

  @Override
  public ColumnEntity toEntity(ColumnDto dto) {
    return modelMapper.map(dto, ColumnEntity.class);
  }

}
