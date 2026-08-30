import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleQueryError } from "../../shared/utils/errors/errorHandler";
import type {
  Column,
  CreateCardPathParams,
  CreateCardRequestBody,
  DeleteCardPathParams,
  UpdateCardPathParams,
  UpdateCardRequestBody,
} from "../openapi-types";
import { openApiClient } from "../openApiClient";
import { boardQueryKeys } from "./queryKeys";

const createCard = async (
  path: CreateCardPathParams,
  body: CreateCardRequestBody,
) => {
  const { data, error } = await openApiClient.POST(
    "/api/v1/boards/{boardId}/columns/{columnId}/cards",
    {
      params: {
        path,
      },
      body,
    },
  );

  if (error) handleQueryError(error);
  return data;
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      path,
      body,
    }: {
      path: CreateCardPathParams;
      body: CreateCardRequestBody;
    }) => createCard(path, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardColumns(variables.path.boardId),
      });
    },
  });
};

const updateCard = async (
  path: UpdateCardPathParams,
  body: UpdateCardRequestBody,
) => {
  const { data, error } = await openApiClient.PATCH(
    "/api/v1/boards/{boardId}/columns/{columnId}/cards/{cardId}",
    {
      params: {
        path,
      },
      body,
    },
  );

  if (error) handleQueryError(error);
  return data;
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      path,
      body,
    }: {
      path: UpdateCardPathParams;
      body: UpdateCardRequestBody;
    }) => updateCard(path, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardColumns(variables.path.boardId),
      });
    },
  });
};

const deleteCard = async (path: DeleteCardPathParams) => {
  const { error } = await openApiClient.DELETE(
    "/api/v1/boards/{boardId}/columns/{columnId}/cards/{cardId}",
    {
      params: {
        path,
      },
    },
  );

  if (error) handleQueryError(error);
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (path: DeleteCardPathParams) => deleteCard(path),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardColumns(variables.boardId),
      });
    },
  });
};
