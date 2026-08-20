package com.frzlyv.trello_clone.features.column;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.frzlyv.trello_clone.features.column.domain.ColumnEntity;

/**
 * ColumnRepository
 */
@Repository
public interface ColumnRepository extends JpaRepository<ColumnEntity, Long> {

  @EntityGraph(attributePaths = { "cards" })
  Page<ColumnEntity> findAllByBoardIdOrderByPositionAsc(UUID boardId, Pageable pageable);

  Optional<ColumnEntity> findFirstByBoardIdOrderByPositionDesc(UUID boardId);

  Optional<ColumnEntity> findByIdAndBoardId(Long id, UUID boardId);

  Optional<ColumnEntity> deleteByIdAndBoardId(Long id, UUID boardId);

  boolean existsByIdAndBoardId(Long id, UUID boardId);

  @Query("SELECT COALESCE(MAX(c.position),0) FROM ColumnEntity c WHERE c.board.id = :boardId")
  Long findMaxPositionByBoardId(@Param("boardId") UUID boardId);

  @Modifying
  @Query("UPDATE ColumnEntity c SET c.position = c.position + 1 " +
      "WHERE c.board.id = :boardId AND c.position >= :start AND c.position < :end")
  void shiftPositionsRight(@Param("boardId") UUID boardId, @Param("start") Long start, @Param("end") Long end);

  @Modifying
  @Query("UPDATE ColumnEntity c SET c.position = c.position - 1 " +
      "WHERE c.board.id = :boardId AND c.position > :start AND c.position <= :end")
  void shiftPositionsLeft(@Param("boardId") UUID boardId, @Param("start") Long start, @Param("end") Long end);

  @Modifying
  @Query("UPDATE ColumnEntity c SET c.position = c.position - 1 " +
      "WHERE c.board.id = :boardId AND c.position > :start")
  void shiftPositionsLeft(@Param("boardId") UUID boardId, @Param("start") Long start);

}
