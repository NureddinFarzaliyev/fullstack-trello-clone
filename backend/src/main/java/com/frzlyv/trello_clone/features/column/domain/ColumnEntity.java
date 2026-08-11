package com.frzlyv.trello_clone.features.column.domain;

import jakarta.persistence.Column;

import com.frzlyv.trello_clone.features.board.domain.BoardEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ColumnEntity
 */
@Data
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

}
