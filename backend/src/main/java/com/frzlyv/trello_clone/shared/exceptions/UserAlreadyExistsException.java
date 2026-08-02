package com.frzlyv.trello_clone.shared.exceptions;

/**
 * UserAlreadyExistsException
 */
public class UserAlreadyExistsException extends RuntimeException {
  public UserAlreadyExistsException(String message) {
    super(message);
  }
}
