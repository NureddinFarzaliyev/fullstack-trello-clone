import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleQueryError } from "../../shared/utils/errors/errorHandler";
import { openApiClient } from "../openApiClient";
import { boardQueryKeys } from "./queryKeys";

const getBoardMembers = async (boardId: string) => {
  const { data, error } = await openApiClient.GET(
    "/api/v1/boards/{boardId}/members",
    {
      params: {
        path: {
          boardId,
        },
      },
    },
  );

  if (error) handleQueryError(error);
  return data;
};

export const useBoardMembers = (boardId: string) => {
  return useQuery({
    queryKey: boardQueryKeys.members(boardId),
    queryFn: () => getBoardMembers(boardId),
    enabled: boardId !== "",
  });
};

const inviteMember = async (boardId: string, email: string) => {
  const { data, error } = await openApiClient.POST(
    "/api/v1/boards/{boardId}/members",
    {
      params: {
        path: {
          boardId,
        },
      },
      body: {
        email,
      },
    },
  );

  if (error || !data) handleQueryError(error);
  return data;
};

export const useInviteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ boardId, email }: { boardId: string; email: string }) =>
      inviteMember(boardId, email),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.members(variables.boardId),
      });
    },
  });
};

const acceptBoardInvite = async (boardId: string) => {
  const { data, error } = await openApiClient.POST(
    "/api/v1/boards/{boardId}/members/accept",
    {
      params: {
        path: {
          boardId,
        },
      },
    },
  );

  if (error || !data) handleQueryError(error);
  return data;
};

export const useAcceptBoardInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId: string) => acceptBoardInvite(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.all,
      });
    },
  });
};

const revokeMember = async (boardId: string, boardMemberId: number) => {
  const { data } = await openApiClient.DELETE(
    "/api/v1/boards/{boardId}/members/{boardMemberId}",
    {
      params: {
        path: {
          boardId,
          boardMemberId,
        },
      },
    },
  );

  return data;
};

export const useRevokeMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      boardMemberId,
    }: {
      boardId: string;
      boardMemberId: number;
    }) => revokeMember(boardId, boardMemberId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.members(variables.boardId),
      });
    },
  });
};
