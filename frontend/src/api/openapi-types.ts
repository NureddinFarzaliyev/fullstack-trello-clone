import type { components, paths } from "./openapi-schema";

// Entities

export type Me = components["schemas"]["UserDto"];

export type Board = components["schemas"]["BoardDto"];

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
