import type { components, paths } from "./openapi-schema";

// Entities

export type Me = components["schemas"]["UserDto"];

export type Board = components["schemas"]["BoardDto"];

export type BoardWithRole = components["schemas"]["BoardWithRoleDto"];

export type BoardRole = components["schemas"]["BoardWithRoleDto"]["role"];

export type Column = components["schemas"]["ColumnDto"];

export type Card = components["schemas"]["CardDto"];

// Request Bodies

export type LoginRequestBody =
  paths["/api/v1/auth/login"]["post"]["requestBody"]["content"]["application/json"];

export type RegisterRequestBody =
  paths["/api/v1/auth/register"]["post"]["requestBody"]["content"]["application/json"];

export type UpdateColumnRequestBody =
  components["schemas"]["UpdateColumnRequestDto"];

export type CreateColumnRequestBody =
  components["schemas"]["CreateColumnRequestDto"];

export type UpdateCardRequestBody =
  components["schemas"]["UpdateCardRequestDto"];

export type CreateCardRequestBody =
  components["schemas"]["CreateCardRequestDto"];

export type InviteMemberRequestBody =
  components["schemas"]["CreateBoardMemberDto"];

// Path Params

export type GetBoardMembersPathParams =
  paths["/api/v1/boards/{boardId}/members"]["get"]["parameters"]["path"];

export type InviteMemberPathParams =
  paths["/api/v1/boards/{boardId}/members"]["post"]["parameters"]["path"];

export type AcceptBoardInvitePathParams =
  paths["/api/v1/boards/{boardId}/members/accept"]["post"]["parameters"]["path"];

export type DeclineBoardInvitePathParams =
  paths["/api/v1/boards/{boardId}/members/decline"]["post"]["parameters"]["path"];

export type RevokeMemberPathParams =
  paths["/api/v1/boards/{boardId}/members/{boardMemberId}"]["delete"]["parameters"]["path"];

export type GetBoardColumnsPathParams =
  paths["/api/v1/boards/{boardId}/columns"]["get"]["parameters"]["path"];

export type GetBoardPathParams =
  paths["/api/v1/boards/{boardId}"]["get"]["parameters"]["path"];

// Query Params

export type GetBoardColumnsQueryParams =
  paths["/api/v1/boards/{boardId}/columns"]["get"]["parameters"]["query"];
