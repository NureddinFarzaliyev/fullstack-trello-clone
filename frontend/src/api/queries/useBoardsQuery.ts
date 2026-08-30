import { useQuery } from "@tanstack/react-query";
import { handleQueryError } from "../../shared/utils/errors/errorHandler";
import { openApiClient } from "../openApiClient";
import { boardQueryKeys } from "./queryKeys";
import type { GetBoardPathParams } from "../openapi-types";

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

const getBoards = async () => {
  const { data, error } = await openApiClient.GET("/api/v1/boards");

  if (error) handleQueryError(error);
  return data;
};

export const useBoards = () => {
  return useQuery({
    queryKey: boardQueryKeys.all,
    queryFn: getBoards,
  });
};

const getBoardById = async (path: GetBoardPathParams) => {
  const { data, error } = await openApiClient.GET("/api/v1/boards/{boardId}", {
    params: {
      path,
    },
  });

  if (error) handleQueryError(error);
  return data;
};

export const useBoard = (path: GetBoardPathParams) => {
  return useQuery({
    queryKey: boardQueryKeys.boardById(path.boardId),
    queryFn: () => getBoardById(path),
    enabled: path.boardId !== "",
  });
};
