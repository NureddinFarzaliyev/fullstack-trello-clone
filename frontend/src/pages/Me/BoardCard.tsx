import { Link } from "react-router";
import type { BoardWithRole } from "../../api/openapi-types";
import { ClockIcon, CrownIcon } from "lucide-react";
import {
  useAcceptBoardInvite,
  useDeclineBoardInvite,
} from "../../api/queries/useMembersQuery";

const BoardCard = ({ board }: { board?: BoardWithRole }) => {
  const { mutate: accept, isPending: isAccepting } = useAcceptBoardInvite();
  const { mutate: decline, isPending: isDeclining } = useDeclineBoardInvite();

  const isPending = isAccepting || isDeclining;

  const onAccept = () => {
    if (isPending || !board) return;
    accept({
      boardId: board?.id || "",
    });
  };

  const onDecline = () => {
    if (isPending || !board) return;
    decline({
      boardId: board?.id || "",
    });
  };

  if (!board) return;
  return board.role === "PENDING" ? (
    <div>
      <div className="bg-(--surface-a0) py-5 px-3 flex gap-2 items-center">
        <ClockIcon />{" "}
        <span> You've been invited to "{board.title || ""}".</span>
        <button
          disabled={isPending}
          onClick={onAccept}
          className="underline cursor-pointer"
        >
          {isPending ? "Accepting..." : "Accept"}
        </button>
        <button
          disabled={isPending}
          onClick={onDecline}
          className="underline cursor-pointer"
        >
          {isPending ? "Declining..." : "Decline"}
        </button>
      </div>
    </div>
  ) : (
    <Link to={`/boards/${board.id}`}>
      <div className="bg-(--surface-a0) hover:bg-(--surface-a10) transition duration-100 py-5 px-3 cursor-pointer flex items-center gap-2">
        {board.title || ""}
        {board.role === "OWNER" && (
          <CrownIcon size={20} className="opacity-70" />
        )}
      </div>
    </Link>
  );
};

export default BoardCard;
