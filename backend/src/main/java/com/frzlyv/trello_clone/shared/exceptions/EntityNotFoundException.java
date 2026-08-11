package com.frzlyv.trello_clone.shared.exceptions;

/**
 * EntityNotFoundException
 */
public class EntityNotFoundException extends RuntimeException {
  public EntityNotFoundException(String message) {
    super(message);
  }
}
