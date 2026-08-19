package com.frzlyv.trello_clone.features.boardMember;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.frzlyv.trello_clone.features.boardMember.domain.BoardMemberEntity;
import com.frzlyv.trello_clone.features.boardMember.domain.BoardRole;

/**
 * BoardMemberRepository
 */
@Repository
public interface BoardMemberRepository extends JpaRepository<BoardMemberEntity, Long> {

  Optional<BoardMemberEntity> findOneByUserId(Long id);

  Optional<BoardMemberEntity> findOneByBoardIdAndUserId(UUID boardId, Long userId);

  Optional<BoardMemberEntity> findByBoardIdAndUserIdAndRole(UUID boardId, Long userId, BoardRole role);

  List<BoardMemberEntity> findAllByBoardId(UUID boardId);

  List<BoardMemberEntity> findAllByUserId(Long userId);

  @Query("SELECT bm FROM BoardMemberEntity bm JOIN FETCH bm.board WHERE bm.user.id = :userId")
  List<BoardMemberEntity> findAllByUserIdWithBoard(@Param("userId") Long userId);

  Boolean existsByBoardIdAndUserId(UUID boardId, Long userId);

  Boolean existsByBoardIdAndUserIdAndRole(UUID boardId, Long userId, BoardRole role);

  void deleteByIdAndBoardId(Long id, UUID boardId);

}
