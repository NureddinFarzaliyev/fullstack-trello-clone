package com.frzlyv.trello_clone.features.card;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.frzlyv.trello_clone.features.card.domain.CardEntity;

/**
 * CardRepository
 */
@Repository
public interface CardRepository extends JpaRepository<CardEntity, Long> {

  Optional<CardEntity> findFirstByColumnIdOrderByPositionDesc(Long columnId);

  void deleteByIdAndColumnId(Long id, Long columnId);

}
