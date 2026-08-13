import { useQuery } from "@tanstack/react-query";
import { handleQueryError } from "../../shared/utils/errors/errorHandler";
import { openApiClient } from "../openApiClient";
import { boardQueryKeys } from "./queryKeys";

const getDefaultBoard = async () => {
  const { data, error } = await openApiClient.GET("/api/v1/boards/default");

  if (error) handleQueryError(error);
  return data;
};

export const useDefaultBoard = () => {
  return useQuery({
    queryKey: boardQueryKeys.default(),
    queryFn: getDefaultBoard,
  });
};

const getBoardById = async (boardId: string) => {
  const { data, error } = await openApiClient.GET("/api/v1/boards/{boardId}", {
    params: {
      path: {
        boardId,
      },
    },
  });

  if (error) handleQueryError(error);
  return data;
};

export const useBoard = (boardId: string) => {
  return useQuery({
    queryKey: boardQueryKeys.boardById(boardId),
    queryFn: () => getBoardById(boardId),
    enabled: boardId !== "",
  });
};
