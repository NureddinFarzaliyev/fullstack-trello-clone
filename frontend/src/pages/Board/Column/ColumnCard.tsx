import { GripVertical } from "lucide-react";
import type { Column } from "../../../api/openapi-types";
import DeleteColumn from "./DeleteColumn";
import UpdateColumn from "./UpdateColumn";
import ColumnCards from "./Card/ColumnCards";
import type { DraggableProvided } from "@hello-pangea/dnd";

const ColumnCard = ({
  column,
  dragDisabled,
  boardId,
  provided,
}: {
  column?: Column;
  dragDisabled?: boolean;
  boardId: string;
  provided?: DraggableProvided;
}) => {
  return (
    <div
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
        <div {...(provided?.dragHandleProps ?? {})}>
          <GripVertical className="-mr-2 opacity-50 cursor-grab shrink-0" />
        </div>
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
