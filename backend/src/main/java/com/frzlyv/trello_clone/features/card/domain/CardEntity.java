package com.frzlyv.trello_clone.features.card.domain;

import java.util.Date;

import com.frzlyv.trello_clone.features.column.domain.ColumnEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * CardEntity
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "cards")
public class CardEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "card_id_seq")
  Long id;

  @Column(nullable = false)
  String title;

  String description;

  Long position;

  Date due;

  @Builder.Default
  Boolean completed = false;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "column_id", nullable = false)
  ColumnEntity column;

}
