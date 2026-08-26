package com.frzlyv.trello_clone.features.card;

import java.util.UUID;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.frzlyv.trello_clone.features.card.domain.CardDto;
import com.frzlyv.trello_clone.features.card.domain.CardEntity;
import com.frzlyv.trello_clone.features.card.domain.CreateCardRequestDto;
import com.frzlyv.trello_clone.features.card.domain.UpdateCardRequestDto;
import com.frzlyv.trello_clone.features.column.ColumnRepository;
import com.frzlyv.trello_clone.features.column.domain.ColumnEntity;
import com.frzlyv.trello_clone.features.ws.domain.BoardEventPayloadDto;
import com.frzlyv.trello_clone.features.ws.domain.BoardEventPayloadType;
import com.frzlyv.trello_clone.shared.Mapper;
import com.frzlyv.trello_clone.shared.utils.TransactionUtils;

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
  private final SimpMessagingTemplate simpMessagingTemplate;

  @Override
  @PreAuthorize("@boardSecurity.hasColumnAccess(#boardId, #columnId)")
  public CardDto createCard(UUID boardId, Long columnId, CreateCardRequestDto body) {
    ColumnEntity columnProxy = columnRepository.getReferenceById(columnId);

    Long maxPos = cardRepository.findFirstByColumnIdOrderByPositionDesc(columnId)
        .map(CardEntity::getPosition)
        .orElse(0l);

    CardEntity card = CardEntity.builder()
        .column(columnProxy)
        .title(body.getTitle())
        .description(body.getDescription())
        .position(maxPos + 1)
        .due(body.getDue())
        .build();

    CardEntity savedCard = cardRepository.save(card);
    CardDto savedCardDto = modelMapper.toDto(savedCard);

    simpMessagingTemplate.convertAndSend("/topic/board/" + boardId,
        new BoardEventPayloadDto<CardDto>(savedCardDto, BoardEventPayloadType.CARD_CREATE));

    return savedCardDto;

  }

  @Override
  @PreAuthorize("@boardSecurity.hasColumnAccess(#boardId, #columnId)")
  @Transactional
  public void deleteCard(UUID boardId, Long columnId, Long cardId) {
    CardEntity card = cardRepository.deleteByIdAndColumnId(cardId, columnId).orElse(null);
    if (card != null) {
      cardRepository.shiftPositionsLeft(columnId, card.getPosition());
      TransactionUtils.registerAfterCommit(() -> {
        simpMessagingTemplate.convertAndSend("/topic/board/" + boardId,
            new BoardEventPayloadDto<Long>(1l, BoardEventPayloadType.CARD_DELETE));
      });
    }
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
    if (body.getCompleted() != null) {
      card.setCompleted(body.getCompleted());
    }

    Long newPos = body.getPosition();
    Long prevPos = card.getPosition();
    Long newCol = body.getColumnId();
    Long prevCol = card.getColumn().getId();

    // Change column only, assign pos to maxPos
    if (newCol != null && newPos == null && !prevCol.equals(newCol)) {
      ColumnEntity column = columnRepository.findByIdAndBoardId(newCol, boardId)
          .orElseThrow(() -> new EntityNotFoundException("Column not found."));
      card.setColumn(column);

      // Assign card position to maxPos
      Long maxPos = cardRepository.findFirstByColumnIdOrderByPositionDesc(newCol)
          .map(CardEntity::getPosition)
          .orElse(0l);
      card.setPosition(maxPos + 1);

      // (prevPos:) shift to left on prevCol
      cardRepository.shiftPositionsLeft(prevCol, prevPos);
    }

    // Change both column and position
    if (newCol != null && newPos != null && !prevCol.equals(newCol)) {
      // change column
      ColumnEntity column = columnRepository.findByIdAndBoardId(newCol, boardId)
          .orElseThrow(() -> new EntityNotFoundException("Column not found."));

      // [0, maxPos]
      Long maxPos = cardRepository.findFirstByColumnIdOrderByPositionDesc(newCol)
          .map(CardEntity::getPosition)
          .orElse(0l);
      newPos = Math.max(0l, Math.min(newPos, maxPos + 1));

      // (prevPos:) shift to left on prevCol
      cardRepository.shiftPositionsLeft(prevCol, prevPos);

      // [newPos:) shift to right on newCol
      cardRepository.shiftPositionsRight(newCol, newPos);

      // assign position and column
      card.setPosition(newPos);
      card.setColumn(column);
    }

    // Change position only
    if (newPos != null && (newCol == null || newCol.equals(prevCol))) {
      Long maxPos = cardRepository.findFirstByColumnIdOrderByPositionDesc(columnId)
          .map(CardEntity::getPosition)
          .orElse(0l);

      // [0, maxPos]
      newPos = Math.max(0L, Math.min(newPos, maxPos));

      if (!newPos.equals(prevPos)) {
        if (newPos < prevPos) {
          // shifted up (left), increment [newPos, prevPos)
          cardRepository.shiftPositionsRight(columnId, prevPos, newPos);
        } else {
          // shifted down (right), decrement (prevPos, newPos]
          cardRepository.shiftPositionsLeft(columnId, prevPos, newPos);
        }
      }

      card.setPosition(newPos);
    }

    CardEntity savedCard = cardRepository.save(card);
    CardDto savedCardDto = modelMapper.toDto(savedCard);

    TransactionUtils.registerAfterCommit(() -> {
      simpMessagingTemplate.convertAndSend("/topic/board/" + boardId,
          new BoardEventPayloadDto<CardDto>(savedCardDto, BoardEventPayloadType.CARD_PATCH));
    });

    return savedCardDto;
  }

}
