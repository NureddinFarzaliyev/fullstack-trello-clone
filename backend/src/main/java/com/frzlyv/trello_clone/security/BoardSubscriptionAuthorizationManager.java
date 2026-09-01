package com.frzlyv.trello_clone.security;

import java.util.UUID;
import java.util.function.Supplier;

import org.jspecify.annotations.Nullable;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.authorization.AuthorizationResult;
import org.springframework.security.core.Authentication;
import org.springframework.security.messaging.access.intercept.MessageAuthorizationContext;
import org.springframework.stereotype.Component;

import com.frzlyv.trello_clone.features.boardMember.BoardSecurityEvaluator;

import lombok.RequiredArgsConstructor;

/**
 * BoardSubscriptionAuthorizationManager
 */
@Component
@RequiredArgsConstructor
public class BoardSubscriptionAuthorizationManager
    implements AuthorizationManager<MessageAuthorizationContext<?>> {

  private final BoardSecurityEvaluator boardSecurityEvaluator;

  @Override
  public @Nullable AuthorizationResult authorize(Supplier<? extends @Nullable Authentication> authentication,
      MessageAuthorizationContext<?> context) {
    Authentication auth = authentication.get();
    if (auth == null || !auth.isAuthenticated()) {
      return new AuthorizationDecision(false);
    }

    String boardIdRaw = context.getVariables().get("boardId");
    if (boardIdRaw == null) {
      return new AuthorizationDecision(false);
    }

    UUID boardId;
    try {
      boardId = UUID.fromString(boardIdRaw);
    } catch (IllegalArgumentException e) {
      return new AuthorizationDecision(false);
    }

    boolean hasAccess = boardSecurityEvaluator.hasBoardAccess(boardId);
    return new AuthorizationDecision(hasAccess);
  }

}
