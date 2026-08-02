package com.frzlyv.trello_clone.shared;

/**
 * Mapper
 */
public interface Mapper<Entity, DTO> {

  Entity toEntity(DTO dto);

  DTO toDto(Entity entity);

}
