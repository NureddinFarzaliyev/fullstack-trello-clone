import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";
import type { Column } from "../../../api/openapi-types";
import DeleteColumn from "./DeleteColumn";
import UpdateColumn from "./UpdateColumn";
import ColumnCards from "./Card/ColumnCards";

const ColumnCard = ({
  column,
  index,
  dragDisabled,
  boardId,
}: {
  column?: Column;
  index: number;
  dragDisabled?: boolean;
  boardId: string;
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
      <div className="group flex gap-2 justify-between shrink-0">
        <div className="flex gap-2">
          <span className="">{column?.title}</span>
          <div className="opacity-0 group-hover:opacity-60 transition-opacity duration-100 shrink-0">
            <DeleteColumn
              boardId={column?.boardId ?? ""}
              columnId={column?.id ?? 0}
            />
            <UpdateColumn
              boardId={column?.boardId ?? ""}
              columnId={column?.id ?? 0}
            />
          </div>
        </div>
        <GripVertical
          ref={handleRef}
          className="-mr-2 opacity-50 cursor-grab shrink-0"
        />
      </div>
      <div className="mt-5">
        <ColumnCards
          cards={column?.cards ?? []}
          boardId={boardId}
          columnId={column?.id ?? 0}
        />
      </div>
    </div>
  );
};

export default ColumnCard;
