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
    <div className="flex flex-col gap-2">
      {cards.map((c) => (
        <CardItem card={c} boardId={boardId} />
      ))}
      <CreateCard columnId={columnId} boardId={boardId} />
    </div>
  );
};

export default ColumnCards;
