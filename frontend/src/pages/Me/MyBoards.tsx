import { useQueryClient } from "@tanstack/react-query";
import { useBoards } from "../../api/queries/useBoardsQuery";
import FadeIn from "../../shared/ui/animation/FadeIn";
import HorizontalFullSpinner from "../../shared/ui/loading/HorizontalFullSpinner";
import SectionHeader from "../../shared/ui/section/SectionHeader";
import BoardCard from "./BoardCard";
import { useSubscription } from "react-stomp-hooks";
import { boardQueryKeys } from "../../api/queries/queryKeys";
import { invitationEvents } from "../../shared/utils/websocket";

const MyBoards = ({ email }: { email: string }) => {
  const { data, isPending } = useBoards();

  const queryClient = useQueryClient();

  useSubscription(`/queue/invitations/${email}`, (message) => {
    const event = JSON.parse(message.body);
    if (invitationEvents.includes(event.type)) {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.all,
      });
    }
  });

  return (
    <div>
      <SectionHeader text="Your Boards" />
      {isPending ? (
        <HorizontalFullSpinner />
      ) : (
        <FadeIn>
          <div className="flex flex-col gap-2">
            {data?.map((board) => <BoardCard board={board} />)}
          </div>
        </FadeIn>
      )}
    </div>
  );
};

export default MyBoards;
