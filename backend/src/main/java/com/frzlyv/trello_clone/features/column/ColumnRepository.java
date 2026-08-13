package com.frzlyv.trello_clone.features.column;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.frzlyv.trello_clone.features.column.domain.ColumnEntity;

/**
 * ColumnRepository
 */
@Repository
public interface ColumnRepository extends JpaRepository<ColumnEntity, Long> {

  Page<ColumnEntity> findAllByBoardId(UUID boardId, Pageable pageable);

}
