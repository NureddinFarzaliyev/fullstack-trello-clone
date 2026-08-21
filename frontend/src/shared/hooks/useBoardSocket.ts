import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJs from "sockjs-client";
import { useQueryClient } from "@tanstack/react-query";
import { boardQueryKeys } from "../../api/queries/queryKeys";
import { boardEvents } from "../utils/websocket";

export const useBoardSocket = (boardId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () =>
        new SockJs(
          `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/ws`,
        ),
      onConnect: () => {
        client.subscribe(`/topic/board/${boardId}`, (message) => {
          const event = JSON.parse(message.body);
          if (boardEvents.includes(event.type)) {
            queryClient.invalidateQueries({
              queryKey: boardQueryKeys.boardById(boardId ?? ""),
            });
          }
        });
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [boardId, queryClient]);
};
