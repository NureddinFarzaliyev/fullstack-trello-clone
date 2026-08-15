package com.frzlyv.trello_clone.features.card;

import java.util.UUID;

import com.frzlyv.trello_clone.features.card.domain.CardDto;
import com.frzlyv.trello_clone.features.card.domain.CreateCardRequestDto;
import com.frzlyv.trello_clone.features.card.domain.UpdateCardRequestDto;

/**
 * CardService
 */
public interface CardService {

  CardDto createCard(UUID boardId, Long columnId, CreateCardRequestDto body);

  void deleteCard(UUID boardId, Long columnId, Long cardId);

}
