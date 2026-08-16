import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleQueryError } from "../../shared/utils/errors/errorHandler";
import type { CreateCardRequestBody } from "../openapi-types";
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
