package com.frzlyv.trello_clone.shared.events;

import org.springframework.context.ApplicationEvent;

import com.frzlyv.trello_clone.features.user.domain.UserEntity;

/**
 * UserRegisterEvent
 */
public class UserRegisterEvent extends ApplicationEvent {

  private final UserEntity userEntity;

  public UserRegisterEvent(Object source, UserEntity userEntity) {
    super(source);
    this.userEntity = userEntity;
  }

  public UserEntity getUserEntity() {
    return userEntity;
  }

}
