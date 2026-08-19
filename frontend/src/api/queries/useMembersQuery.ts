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
