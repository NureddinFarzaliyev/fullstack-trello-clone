import { GripVertical } from "lucide-react";
import type { Column } from "../../api/openapi-types";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";

const ColumnCard = ({ column, index }: { column?: Column; index: number }) => {
  const { ref, handleRef } = useSortable({
    id: column?.id ?? 0,
    index,
    type: "column",
    accept: ["item", "column"],
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      ref={ref}
      className="bg-(--surface-a20) w-60 py-3 px-5 flex items-center gap-2 justify-between shrink-0"
      key={column?.id}
    >
      <span>{column?.title}</span>
      <GripVertical ref={handleRef} className="-mr-2 opacity-50 cursor-grab" />
    </div>
  );
};

export default ColumnCard;
