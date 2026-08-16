import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleQueryError } from "../../shared/utils/errors/errorHandler";
import type {
  CreateCardRequestBody,
  UpdateCardRequestBody,
} from "../openapi-types";
import { openApiClient } from "../openApiClient";
import { boardQueryKeys } from "./queryKeys";

const createCard = async (
  boardId: string,
  columnId: number,
  body: CreateCardRequestBody,
) => {
  const { data, error } = await openApiClient.POST(
    "/api/v1/boards/{boardId}/columns/{columnId}/cards",
    {
      params: {
        path: {
          boardId,
          columnId,
        },
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
      boardId,
      columnId,
      body,
    }: {
      boardId: string;
      columnId: number;
      body: CreateCardRequestBody;
    }) => createCard(boardId, columnId, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardColumns(variables.boardId),
      });
    },
  });
};

const updateCard = async (
  boardId: string,
  columnId: number,
  cardId: number,
  body: UpdateCardRequestBody,
) => {
  const { data, error } = await openApiClient.PATCH(
    "/api/v1/boards/{boardId}/columns/{columnId}/cards/{cardId}",
    {
      params: {
        path: {
          boardId,
          columnId,
          cardId,
        },
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
      boardId,
      columnId,
      cardId,
      body,
    }: {
      boardId: string;
      columnId: number;
      cardId: number;
      body: UpdateCardRequestBody;
    }) => updateCard(boardId, columnId, cardId, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardColumns(variables.boardId),
      });
    },
  });
};

const deleteCard = async (
  boardId: string,
  columnId: number,
  cardId: number,
) => {
  const { error } = await openApiClient.DELETE(
    "/api/v1/boards/{boardId}/columns/{columnId}/cards/{cardId}",
    {
      params: {
        path: {
          boardId,
          columnId,
          cardId,
        },
      },
    },
  );

  if (error) handleQueryError(error);
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      columnId,
      cardId,
    }: {
      boardId: string;
      columnId: number;
      cardId: number;
    }) => deleteCard(boardId, columnId, cardId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardColumns(variables.boardId),
      });
    },
  });
};
