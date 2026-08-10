package com.frzlyv.trello_clone.features.board.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.frzlyv.trello_clone.features.boardMember.domain.BoardMemberEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * BoardEntity
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "boards")
public class BoardEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  UUID id;

  @Builder.Default
  Boolean isPublic = true;

  @Column(nullable = false)
  String title;

  @Builder.Default
  @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
  List<BoardMemberEntity> members = new ArrayList<>();

}
