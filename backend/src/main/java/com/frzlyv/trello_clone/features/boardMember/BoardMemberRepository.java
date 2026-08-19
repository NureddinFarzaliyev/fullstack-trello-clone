package com.frzlyv.trello_clone.features.boardMember;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
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

  List<BoardMemberEntity> findAllByBoardId(UUID boardId);

  List<BoardMemberEntity> findAllByUserId(Long userId);

  Boolean existsByBoardIdAndUserId(UUID boardId, Long userId);

  Boolean existsByBoardIdAndUserIdAndRole(UUID boardId, Long userId, BoardRole role);

  void deleteByIdAndBoardId(Long id, UUID boardId);

}
