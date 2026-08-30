import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleQueryError } from "../../shared/utils/errors/errorHandler";
import { openApiClient } from "../openApiClient";
import { boardQueryKeys } from "./queryKeys";
import type {
  AcceptBoardInvitePathParams,
  DeclineBoardInvitePathParams,
  GetBoardMembersPathParams,
  InviteMemberPathParams,
  InviteMemberRequestBody,
  RevokeMemberPathParams,
} from "../openapi-types";

const getBoardMembers = async (path: GetBoardMembersPathParams) => {
  const { data, error } = await openApiClient.GET(
    "/api/v1/boards/{boardId}/members",
    {
      params: {
        path,
      },
    },
  );

  if (error) handleQueryError(error);
  return data;
};

export const useBoardMembers = (params: GetBoardMembersPathParams) => {
  return useQuery({
    queryKey: boardQueryKeys.members(params.boardId),
    queryFn: () => getBoardMembers(params),
    enabled: params.boardId !== "",
  });
};

const inviteMember = async (
  path: InviteMemberPathParams,
  body: InviteMemberRequestBody,
) => {
  const { data, error } = await openApiClient.POST(
    "/api/v1/boards/{boardId}/members",
    {
      params: {
        path,
      },
      body,
    },
  );

  if (error || !data) handleQueryError(error);
  return data;
};

export const useInviteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      path,
      body,
    }: {
      path: InviteMemberPathParams;
      body: InviteMemberRequestBody;
    }) => inviteMember(path, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.members(variables.path.boardId),
      });
    },
  });
};

const acceptBoardInvite = async (path: AcceptBoardInvitePathParams) => {
  const { data, error } = await openApiClient.POST(
    "/api/v1/boards/{boardId}/members/accept",
    {
      params: {
        path,
      },
    },
  );

  if (error || !data) handleQueryError(error);
  return data;
};

export const useAcceptBoardInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (path: AcceptBoardInvitePathParams) => acceptBoardInvite(path),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.all,
      });
    },
  });
};

const declineBoardInvite = async (path: DeclineBoardInvitePathParams) => {
  const { data, error } = await openApiClient.POST(
    "/api/v1/boards/{boardId}/members/decline",
    {
      params: {
        path,
      },
    },
  );

  if (error || !data) handleQueryError(error);
  return data;
};

export const useDeclineBoardInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (path: DeclineBoardInvitePathParams) =>
      declineBoardInvite(path),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.all,
      });
    },
  });
};

const revokeMember = async (path: RevokeMemberPathParams) => {
  const { data } = await openApiClient.DELETE(
    "/api/v1/boards/{boardId}/members/{boardMemberId}",
    {
      params: {
        path,
      },
    },
  );

  return data;
};

export const useRevokeMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (path: RevokeMemberPathParams) => revokeMember(path),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.members(variables.boardId),
      });
    },
  });
};
