import { Clock } from "lucide-react";
import type { Card } from "../../../../api/openapi-types";

const CardItem = ({ card }: { card: Card }) => {
  return (
    <div className="bg-(--surface-a10) py-2 px-3 flex flex-col gap-2">
      <h4>{card.title}</h4>

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
