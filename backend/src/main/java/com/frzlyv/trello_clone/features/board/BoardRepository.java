package com.frzlyv.trello_clone.features.board;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.frzlyv.trello_clone.features.board.domain.BoardEntity;

/**
 * BoardRepository
 */
@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, UUID> {

}
