import { Link } from "react-router";
import type { BoardWithRole } from "../../api/openapi-types";
import { ClockIcon, CrownIcon } from "lucide-react";
import { useAcceptBoardInvite } from "../../api/queries/useMembersQuery";

const BoardCard = ({ board }: { board?: BoardWithRole }) => {
  const { mutate, isPending } = useAcceptBoardInvite();

  const onClick = () => {
    if (isPending || !board) return;
    mutate(board?.id || "");
  };

  if (!board) return;
  return board.role === "PENDING" ? (
    <div>
      <div className="bg-(--surface-a0) py-5 px-3 flex gap-2 items-center">
        <ClockIcon />{" "}
        <span> You've been invited to "{board.title || ""}".</span>
        <button
          disabled={isPending}
          onClick={onClick}
          className="underline cursor-pointer"
        >
          {isPending ? "Accepting..." : "Click here to accept"}
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
