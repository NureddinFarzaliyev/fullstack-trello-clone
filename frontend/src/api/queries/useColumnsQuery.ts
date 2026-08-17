import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { handleQueryError } from "../../shared/utils/errors/errorHandler";
import { DEFAULT_PAGE_SIZE } from "../../shared/utils/pagination";
import { openApiClient } from "../openApiClient";
import { boardQueryKeys } from "./queryKeys";
import type {
  Column,
  CreateColumnRequestBody,
  UpdateColumnRequestBody,
} from "../openapi-types";

const getBoardColumns = async (boardId: string, page: number) => {
  const { data, error } = await openApiClient.GET(
    "/api/v1/boards/{boardId}/columns",
    {
      params: {
        query: {
          pageable: {
            page,
            size: DEFAULT_PAGE_SIZE,
          },
        },
        path: {
          boardId,
        },
      },
    },
  );

  if (error) handleQueryError(error);
  return data;
};

export const useBoardColumns = (boardId: string) => {
  return useInfiniteQuery({
    queryKey: boardQueryKeys.boardColumns(boardId),
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => getBoardColumns(boardId, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      const lastPageNumber = lastPage?.pageable?.pageNumber;
      return lastPageNumber !== null && lastPageNumber !== undefined
        ? lastPageNumber + 1
        : undefined;
    },
  });
};

const updateColumn = async (
  boardId: string,
  columnId: number,
  body: UpdateColumnRequestBody,
) => {
  const { data, error } = await openApiClient.PATCH(
    "/api/v1/boards/{boardId}/columns/{columnId}",
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

export const useUpdateColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      columnId,
      body,
    }: {
      boardId: string;
      columnId: number;
      body: UpdateColumnRequestBody;
    }) => updateColumn(boardId, columnId, body),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardColumns(variables.boardId ?? ""),
      });
    },
  });
};

const createColumn = async (boardId: string, body: CreateColumnRequestBody) => {
  const { data, error } = await openApiClient.POST(
    "/api/v1/boards/{boardId}/columns",
    {
      params: {
        path: {
          boardId,
        },
      },
      body,
    },
  );

  if (error) handleQueryError(error);
  return data;
};

export const useCreateColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      body,
    }: {
      boardId: string;
      body: CreateColumnRequestBody;
    }) => createColumn(boardId, body),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardColumns(variables.boardId ?? ""),
      });
    },
  });
};

const deleteColumn = async ({
  boardId,
  columnId,
}: {
  boardId: string;
  columnId: number;
}) => {
  const { error } = await openApiClient.DELETE(
    "/api/v1/boards/{boardId}/columns/{columnId}",
    {
      params: {
        path: {
          boardId,
          columnId,
        },
      },
    },
  );

  if (error) handleQueryError(error);
};

export const useDeleteColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      columnId,
    }: {
      boardId: string;
      columnId: number;
    }) => deleteColumn({ boardId, columnId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardColumns(variables.boardId ?? ""),
      });
    },
  });
};
