import { Draggable, Droppable } from "@hello-pangea/dnd";
import type { Card } from "../../../../api/openapi-types";
import CardItem from "./CardItem";
import CreateCard from "./CreateCard";

const ColumnCards = ({
  cards,
  boardId,
  columnId,
  isDragDisabled,
}: {
  cards: Card[];
  boardId: string;
  columnId: number;
  isDragDisabled?: boolean;
}) => {
  return (
    <Droppable droppableId={`column-${columnId}`} type="card">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-col"
        >
          {cards.map((c, i) => (
            <Draggable
              key={c?.id}
              draggableId={`card-${c?.id ?? ""}`}
              index={i}
              isDragDisabled={isDragDisabled}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  key={c.id}
                >
                  <CardItem card={c} boardId={boardId} provided={provided} />
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
