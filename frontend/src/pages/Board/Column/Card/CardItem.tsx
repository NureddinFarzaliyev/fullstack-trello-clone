import { Clock } from "lucide-react";
import type { Card } from "../../../../api/openapi-types";
import UpdateCard from "./UpdateCard";
import DeleteCard from "./DeleteCard";

const CardItem = ({ card, boardId }: { card: Card; boardId: string }) => {
  return (
    <div className="bg-(--surface-a10) py-2 px-3 flex flex-col gap-2">
      <div className="flex gap-1 group">
        <h4>{card.title}</h4>
        <div className="group-hover:opacity-60 opacity-0 transition duration-100 shrink-0">
          <UpdateCard
            boardId={boardId}
            columnId={card.columnId ?? 0}
            cardId={card.id ?? 0}
          />
          <DeleteCard
            boardId={boardId}
            columnId={card.columnId ?? 0}
            cardId={card.id ?? 0}
          />
        </div>
      </div>

      {card.due && (
        <div className="flex items-center gap-1 text-sm opacity-80">
          <Clock size={16} />
          <span className="ml-1">
            {card.due?.toString().split("T")[0]}{" "}
            {card.due?.toString().split("T")[1].split(".")[0]}
          </span>
        </div>
      )}
    </div>
  );
};

export default CardItem;
