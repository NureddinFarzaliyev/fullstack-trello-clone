package com.frzlyv.trello_clone.features.card;

import java.util.UUID;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.frzlyv.trello_clone.features.card.domain.CardDto;
import com.frzlyv.trello_clone.features.card.domain.CreateCardRequestDto;

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

}
