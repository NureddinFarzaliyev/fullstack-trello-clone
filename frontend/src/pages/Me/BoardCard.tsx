import { Link } from "react-router";
import type { Board } from "../../api/openapi-types";

const BoardCard = ({ board }: { board?: Board }) => {
  if (!board) return;
  return (
    <Link to={`/boards/${board.id}`}>
      <div className="bg-(--surface-a0) hover:bg-(--surface-a10) transition duration-100 py-5 px-3 cursor-pointer">
        {board.title || ""}
      </div>
    </Link>
  );
};

export default BoardCard;
