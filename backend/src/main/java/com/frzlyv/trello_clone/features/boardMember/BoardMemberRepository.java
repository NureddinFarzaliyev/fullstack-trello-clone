package com.frzlyv.trello_clone.features.boardMember;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.frzlyv.trello_clone.features.boardMember.domain.BoardMemberEntity;

/**
 * BoardMemberRepository
 */
@Repository
public interface BoardMemberRepository extends JpaRepository<BoardMemberEntity, Long> {

  Optional<BoardMemberEntity> findOneByUserId(Long id);

}
