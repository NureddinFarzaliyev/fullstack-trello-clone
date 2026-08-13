import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";
import type { Column } from "../../../api/openapi-types";

const ColumnCard = ({
  column,
  index,
  dragDisabled,
}: {
  column?: Column;
  index: number;
  dragDisabled?: boolean;
}) => {
  const { ref, handleRef } = useSortable({
    id: column?.id ?? 0,
    index,
    type: "column",
    accept: ["item", "column"],
    collisionPriority: CollisionPriority.Low,
    disabled: dragDisabled,
  });

  return (
    <div
      ref={ref}
      className="bg-(--surface-a20) w-60 py-3 px-5 shrink-0 h-fit"
      key={column?.id}
    >
      <div className="flex gap-2 justify-between shrink-0">
        <span className="">{column?.title}</span>
        <GripVertical
          ref={handleRef}
          className="-mr-2 opacity-50 cursor-grab shrink-0"
        />
      </div>
    </div>
  );
};

export default ColumnCard;
