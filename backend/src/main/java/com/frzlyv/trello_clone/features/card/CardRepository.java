package com.frzlyv.trello_clone.features.card;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.frzlyv.trello_clone.features.card.domain.CardEntity;

/**
 * CardRepository
 */
@Repository
public interface CardRepository extends JpaRepository<CardEntity, Long> {

  Optional<CardEntity> findFirstByColumnIdOrderByPositionDesc(Long columnId);

  Optional<CardEntity> findByIdAndColumnId(Long id, Long columnId);

  Optional<CardEntity> deleteByIdAndColumnId(Long id, Long columnId);

  // increment [newPos, prevPos)
  @Modifying
  @Query("UPDATE CardEntity c SET c.position = c.position + 1 " +
      "WHERE c.column.id = :columnId AND c.position >= :newPos AND c.position < :prevPos")
  void shiftPositionsRight(@Param("columnId") Long columnId, @Param("prevPos") Long prevPos,
      @Param("newPos") Long newPos);

  // decrement (prevPos, newPos]
  @Modifying
  @Query("UPDATE CardEntity c SET c.position = c.position - 1 " +
      "WHERE c.column.id = :columnId AND c.position > :prevPos AND c.position <= :newPos")
  void shiftPositionsLeft(@Param("columnId") Long columnId, @Param("prevPos") Long prevPos,
      @Param("newPos") Long newPos);

  // deletion decrement (prevPos:)
  @Modifying
  @Query("UPDATE CardEntity c SET c.position = c.position - 1 " +
      "WHERE c.column.id = :columnId AND c.position > :prevPos")
  void shiftPositionsLeft(@Param("columnId") Long columnId, @Param("prevPos") Long prevPos);

  // insertion increment [newPos:)
  @Modifying
  @Query("UPDATE CardEntity c SET c.position = c.position + 1 " +
      "WHERE c.column.id = :columnId AND c.position >= :newPos")
  void shiftPositionsRight(@Param("columnId") Long columnId, @Param("newPos") Long newPos);

}
