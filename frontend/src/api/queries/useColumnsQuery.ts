import { useInfiniteQuery } from "@tanstack/react-query";
import { handleQueryError } from "../../shared/utils/errors/errorHandler";
import { DEFAULT_PAGE_SIZE } from "../../shared/utils/pagination";
import { openApiClient } from "../openApiClient";
import { boardQueryKeys } from "./queryKeys";

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
