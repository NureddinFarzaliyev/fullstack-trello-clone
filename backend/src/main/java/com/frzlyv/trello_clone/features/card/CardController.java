package com.frzlyv.trello_clone.features.card;

import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.frzlyv.trello_clone.features.card.domain.CardDto;
import com.frzlyv.trello_clone.features.card.domain.CreateCardRequestDto;
import com.frzlyv.trello_clone.features.card.domain.UpdateCardRequestDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * CardController
 */
@RestController
@RequestMapping("/api/v1/boards/{boardId}/columns/{columnId}/cards")
@RequiredArgsConstructor
public class CardController {

  private final CardService cardService;

  @PostMapping
  CardDto createCard(@PathVariable UUID boardId, @PathVariable Long columnId,
      @Valid @RequestBody CreateCardRequestDto body) {
    return cardService.createCard(boardId, columnId, body);
  }

  @DeleteMapping("/{cardId}")
  void deleteCard(@PathVariable UUID boardId, @PathVariable Long columnId, @PathVariable Long cardId) {
    cardService.deleteCard(boardId, columnId, cardId);
  }

  @PatchMapping("/{cardId}")
  CardDto updateCard(@PathVariable UUID boardId, @PathVariable Long columnId, @PathVariable Long cardId,
      @Valid @RequestBody UpdateCardRequestDto body) {
    return cardService.updateCard(boardId, columnId, cardId, body);
  }

}
