import type { components, paths } from "./openapi-schema";

// Auth

export type LoginRequestBody =
  paths["/api/v1/auth/login"]["post"]["requestBody"]["content"]["application/json"];

export type RegisterRequestBody =
  paths["/api/v1/auth/register"]["post"]["requestBody"]["content"]["application/json"];

export type Me = components["schemas"]["UserDto"];
