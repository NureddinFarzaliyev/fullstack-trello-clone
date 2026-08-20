package com.frzlyv.trello_clone.features.column.domain;

import jakarta.persistence.Column;

import java.util.ArrayList;
import java.util.List;

import com.frzlyv.trello_clone.features.board.domain.BoardEntity;
import com.frzlyv.trello_clone.features.card.domain.CardEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ColumnEntity
 */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "columns")
public class ColumnEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "column_id_seq")
  Long id;

  @Column(nullable = false)
  String title;

  @Column(nullable = false)
  Long position;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "board_id", nullable = false)
  BoardEntity board;

  @Builder.Default
  @OneToMany(mappedBy = "column", cascade = CascadeType.ALL, orphanRemoval = true)
  @OrderBy("position ASC")
  List<CardEntity> cards = new ArrayList<>();

}
