package com.frzlyv.trello_clone.features.card;

import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.frzlyv.trello_clone.features.card.domain.CardDto;
import com.frzlyv.trello_clone.features.card.domain.CardEntity;
import com.frzlyv.trello_clone.features.card.domain.CreateCardRequestDto;
import com.frzlyv.trello_clone.features.card.domain.UpdateCardRequestDto;
import com.frzlyv.trello_clone.features.column.ColumnRepository;
import com.frzlyv.trello_clone.features.column.domain.ColumnEntity;
import com.frzlyv.trello_clone.shared.Mapper;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

/**
 * CardServiceImpl
 */
@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

  private final ColumnRepository columnRepository;
  private final CardRepository cardRepository;
  private final Mapper<CardEntity, CardDto> modelMapper;

  @Override
  @PreAuthorize("@boardSecurity.hasColumnAccess(#boardId, #columnId)")
  public CardDto createCard(UUID boardId, Long columnId, CreateCardRequestDto body) {

    ColumnEntity column = columnRepository.findById(columnId)
        .orElseThrow(() -> new EntityNotFoundException("Column not found."));

    Long maxPos = cardRepository.findFirstByColumnIdOrderByPositionDesc(columnId)
        .map(CardEntity::getPosition)
        .orElse(0l);

    CardEntity card = CardEntity.builder()
        .column(column)
        .title(body.getTitle())
        .description(body.getDescription())
        .position(maxPos + 1)
        .due(body.getDue())
        .build();

    CardEntity savedCard = cardRepository.save(card);

    return modelMapper.toDto(savedCard);

  }

  @Override
  @PreAuthorize("@boardSecurity.hasColumnAccess(#boardId, #columnId)")
  @Transactional
  public void deleteCard(UUID boardId, Long columnId, Long cardId) {
    cardRepository.deleteByIdAndColumnId(cardId, columnId);
  }

  @Override
  @PreAuthorize("@boardSecurity.hasColumnAccess(#boardId, #columnId)")
  @Transactional
  public CardDto updateCard(UUID boardId, Long columnId, Long cardId, UpdateCardRequestDto body) {
    CardEntity card = cardRepository.findByIdAndColumnId(cardId, columnId)
        .orElseThrow(() -> new EntityNotFoundException("Column not found."));

    if (body.getTitle() != null) {
      card.setTitle(body.getTitle());
    }
    if (body.getDescription() != null) {
      card.setDescription(body.getDescription());
    }
    if (body.getDue() != null) {
      card.setDue(body.getDue());
    }
    if (body.getColumnId() != null) {
      ColumnEntity column = columnRepository.findByIdAndBoardId(body.getColumnId(), boardId)
          .orElseThrow(() -> new EntityNotFoundException("Column not found."));
      card.setColumn(column);
    }

    Long newPos = body.getPosition();
    Long prevPos = card.getPosition();
    Long maxPos = cardRepository.findFirstByColumnIdOrderByPositionDesc(columnId)
        .map(CardEntity::getPosition)
        .orElseThrow(() -> new EntityNotFoundException("Column not found."));

    // [0, maxPos]
    newPos = Math.max(0L, Math.min(newPos, maxPos));

    if (newPos != null && prevPos != newPos) {
      if (newPos < prevPos) {
        // shifted up (left), increment [newPos, prevPos)
        cardRepository.shiftPositionsRight(columnId, prevPos, newPos);
      } else {
        // shifted down (right), decrement (prevPos, newPos]
        cardRepository.shiftPositionsLeft(columnId, prevPos, newPos);
      }

      card.setPosition(newPos);
    }

    return modelMapper.toDto(card);
  }

}
