import { Draggable, Droppable } from "@hello-pangea/dnd";
import type { Card } from "../../../../api/openapi-types";
import CardItem from "./CardItem";
import CreateCard from "./CreateCard";

const ColumnCards = ({
  cards,
  boardId,
  columnId,
}: {
  cards: Card[];
  boardId: string;
  columnId: number;
}) => {
  return (
    <Droppable droppableId={`column-${columnId}`} type="card">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-col gap-2"
        >
          {cards.map((c, i) => (
            <Draggable
              key={c?.id}
              draggableId={`card-${c?.id ?? ""}`}
              index={i}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  key={c.id}
                >
                  <CardItem card={c} boardId={boardId} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <CreateCard columnId={columnId} boardId={boardId} />
        </div>
      )}
    </Droppable>
  );
};

export default ColumnCards;
