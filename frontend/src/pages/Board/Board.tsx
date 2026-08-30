import { Link, useParams } from "react-router";
import { useBoard } from "../../api/queries/useBoardsQuery";
import FullPageSpinner from "../../shared/ui/loading/FullPageSpinner";
import Section from "../../shared/ui/section/Section";
import { ChevronLeft } from "lucide-react";
import FadeIn from "../../shared/ui/animation/FadeIn";
import Columns from "./Column/Columns";
import BoardMembers from "./BoardMembers";
import { useSubscription } from "react-stomp-hooks";
import { useQueryClient } from "@tanstack/react-query";
import { boardQueryKeys } from "../../api/queries/queryKeys";

const boardEvents = [
  "COLUMN_PATCH",
  "COLUMN_CREATE",
  "COLUMN_DELETE",
  "CARD_PATCH",
  "CARD_CREATE",
  "CARD_DELETE",
];

const Board = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending } = useBoard({
    boardId: id ?? "",
  });

  const queryClient = useQueryClient();

  useSubscription(`/topic/board/${id}`, (message) => {
    const event = JSON.parse(message.body);
    if (boardEvents.includes(event.type)) {
      queryClient.invalidateQueries({
        queryKey: boardQueryKeys.boardById(id ?? ""),
      });
    }
  });

  return isPending ? (
    <FullPageSpinner />
  ) : (
    <FadeIn>
      <Section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Link to="/me" className="opacity-60 hover:opacity-100 transition">
              <ChevronLeft size={32} />
            </Link>
            <h3 className="text-xl">{data?.title}</h3>
          </div>
          <BoardMembers boardId={id ?? ""} isOwner={data?.role === "OWNER"} />
        </div>
        <Columns id={id ?? ""} />
      </Section>
    </FadeIn>
  );
};

export default Board;
