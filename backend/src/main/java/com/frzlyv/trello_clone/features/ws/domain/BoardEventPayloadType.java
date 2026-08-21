
package com.frzlyv.trello_clone.features.ws.domain;

public enum BoardEventPayloadType {
  COLUMN_PATCH,
  COLUMN_DELETE,
  COLUMN_CREATE,
  CARD_PATCH,
  CARD_DELETE,
  CARD_CREATE,
  INVITATION_CREATE,
  INVITATION_DELETE,
  MEMBER_CREATE,
  MEMBER_DELETE,
  MEMBER_PATCH,
}
