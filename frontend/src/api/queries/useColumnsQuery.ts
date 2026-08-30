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
  CreateColumnPathParams,
  CreateColumnRequestBody,
  DeleteColumnPathParams,
  GetBoardColumnsPathParams,
  UpdateColumnPathParams,
  UpdateColumnRequestBody,
} from "../openapi-types";

const getBoardColumns = async (
  path: GetBoardColumnsPathParams,
  page: number,
) => {
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
        path,
      },
    },
  );

  if (error) handleQueryError(error);
  return data;
};

export const useBoardColumns = (path: GetBoardColumnsPathParams) => {
  return useInfiniteQuery({
    queryKey: boardQueryKeys.boardColumns(path.boardId),
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => getBoardColumns(path, pageParam),
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
  path: UpdateColumnPathParams,
  body: UpdateColumnRequestBody,
) => {
  const { data, error } = await openApiClient.PATCH(
    "/api/v1/boards/{boardId}/columns/{columnId}",
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

export const useUpdateColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      path,
      body,
    }: {
      path: UpdateColumnPathParams;
      body: UpdateColumnRequestBody;
    }) => updateColumn(path, body),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardColumns(variables.boardId ?? ""),
      });
    },
  });
};

const createColumn = async (
  path: CreateColumnPathParams,
  body: CreateColumnRequestBody,
) => {
  const { data, error } = await openApiClient.POST(
    "/api/v1/boards/{boardId}/columns",
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

export const useCreateColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      path,
      body,
    }: {
      path: CreateColumnPathParams;
      body: CreateColumnRequestBody;
    }) => createColumn(path, body),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardColumns(variables.boardId ?? ""),
      });
    },
  });
};

const deleteColumn = async (path: DeleteColumnPathParams) => {
  const { error } = await openApiClient.DELETE(
    "/api/v1/boards/{boardId}/columns/{columnId}",
    {
      params: {
        path,
      },
    },
  );

  if (error) handleQueryError(error);
};

export const useDeleteColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (path: DeleteColumnPathParams) => deleteColumn(path),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardColumns(variables.boardId ?? ""),
      });
    },
  });
};
