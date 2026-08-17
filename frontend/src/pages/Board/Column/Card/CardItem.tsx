import { Clock, GripVertical } from "lucide-react";
import type { Card } from "../../../../api/openapi-types";
import UpdateCard from "./UpdateCard";
import DeleteCard from "./DeleteCard";
import type { DraggableProvided } from "@hello-pangea/dnd";

const CardItem = ({
  card,
  boardId,
  provided,
}: {
  card: Card;
  boardId: string;
  provided?: DraggableProvided;
}) => {
  return (
    <div className="bg-(--surface-a10) py-2 px-3 flex flex-col gap-2">
      <div className="flex gap-1 group justify-between items-center">
        <div className="flex gap-2 items-center">
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
        <div {...provided?.dragHandleProps}>
          <GripVertical className="-mr-2 opacity-50 cursor-grab shrink-0" />
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
