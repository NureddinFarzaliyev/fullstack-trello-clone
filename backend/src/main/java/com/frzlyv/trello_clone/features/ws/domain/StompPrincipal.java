package com.frzlyv.trello_clone.features.ws.domain;

import java.security.Principal;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * StompPrincipal
 */
@RequiredArgsConstructor
@Getter
public class StompPrincipal implements Principal {

  private final String name;

}
