package com.frzlyv.trello_clone.features.column;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.frzlyv.trello_clone.features.column.domain.ColumnEntity;

/**
 * ColumnRepository
 */
@Repository
public interface ColumnRepository extends JpaRepository<ColumnEntity, Long> {

}
