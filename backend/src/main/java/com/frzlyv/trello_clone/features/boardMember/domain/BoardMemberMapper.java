package com.frzlyv.trello_clone.features.boardMember.domain;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.frzlyv.trello_clone.shared.Mapper;

import lombok.RequiredArgsConstructor;

/**
 * BoardMemberMapper
 */
@Component
@RequiredArgsConstructor
public class BoardMemberMapper implements Mapper<BoardMemberEntity, BoardMemberDto> {

  private final ModelMapper modelMapper;

  @Override
  public BoardMemberEntity toEntity(BoardMemberDto dto) {
    return modelMapper.map(dto, BoardMemberEntity.class);
  }

  @Override
  public BoardMemberDto toDto(BoardMemberEntity entity) {
    return modelMapper.map(entity, BoardMemberDto.class);
  }

}
