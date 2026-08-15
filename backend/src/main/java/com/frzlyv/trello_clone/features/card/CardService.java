package com.frzlyv.trello_clone.features.card;

import java.util.UUID;

import com.frzlyv.trello_clone.features.card.domain.CardDto;
import com.frzlyv.trello_clone.features.card.domain.CreateCardRequestDto;

/**
 * CardService
 */
public interface CardService {

  CardDto createCard(UUID boardId, Long columnId, CreateCardRequestDto body);

}
