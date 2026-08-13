export const authQueryKeys = {
  all: ["auth"] as const,
};

export const boardQueryKeys = {
  all: ["boards"] as const,
  default: () => [...boardQueryKeys.all, "default"],
  boardById: (boardId: string) => [...boardQueryKeys.all, boardId],
  boardColumns: (boardId: string) => [
    ...boardQueryKeys.boardById(boardId),
    "columns",
  ],
};
