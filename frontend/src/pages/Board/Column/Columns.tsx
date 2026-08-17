import { useBoardColumns } from "../../../api/queries/useColumnsQuery";
import HorizontalFullSpinner from "../../../shared/ui/loading/HorizontalFullSpinner";
import { useRef } from "react";
import InfiniteScrollTrigger from "../../../shared/ui/infiniteScroll/InfiniteScrollTrigger";
import { useIntersectionObserver } from "../../../shared/hooks/useIntersectionObserver";
import FadeIn from "../../../shared/ui/animation/FadeIn";
import Section from "../../../shared/ui/section/Section";
import ColumnCard from "./ColumnCard";
import { useUpdateColumn } from "../../../api/queries/useColumnsQuery";
import CreateColumn from "./CreateColumn";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useUpdateCard } from "../../../api/queries/useCardsQuery";

const Columns = ({ id }: { id: string }) => {
  const {
    data: columnsPages,
    isPending: isColumnsPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBoardColumns(id ?? "");

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(
    loadMoreRef,
    fetchNextPage,
    !!hasNextPage && !isFetchingNextPage,
  );
  const { mutateAsync: updateColumn, isPending: isColumnPending } =
    useUpdateColumn();
  const { mutateAsync: updateCard, isPending: isCardPending } = useUpdateCard();

  const columns = columnsPages?.pages.flatMap((page) => page.content) ?? [];

  return isColumnsPending ? (
    <HorizontalFullSpinner />
  ) : (
    <Section className="overflow-visible!">
      <FadeIn>
        <DragDropContext
          onDragEnd={(result) => {
            const draggedItemId = Number(result.draggableId.split("-")[1]);
            const droppedColumnId = Number(
              result.destination?.droppableId.split("-")[1],
            );
            const sourceColumnId = Number(
              result.source?.droppableId.split("-")[1],
            );
            const droppedIndex = (result.destination?.index || 0) + 1;
            const type = result.type;

            if (result.source && result.destination) {
              if (type === "column") {
                updateColumn({
                  boardId: id ?? "",
                  columnId: draggedItemId,
                  body: { position: droppedIndex },
                });
              } else if (type === "card") {
                updateCard({
                  boardId: id ?? "",
                  columnId: sourceColumnId,
                  cardId: draggedItemId,
                  body: {
                    position: droppedIndex,
                    columnId: droppedColumnId,
                  },
                });
              }
            }
          }}
        >
          <Droppable droppableId="columns" direction="horizontal" type="column">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex gap-4 overflow-x-auto items-start min-w-full"
              >
                {columns.map((c, i) => (
                  <Draggable
                    key={c?.id}
                    draggableId={`column-${c?.id ?? ""}`}
                    index={i}
                  >
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <ColumnCard
                          provided={provided}
                          key={c?.id}
                          column={c}
                          dragDisabled={isColumnPending || isCardPending}
                          boardId={id}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                <CreateColumn boardId={id} />
                <InfiniteScrollTrigger
                  className="w-14! h-14! mt-0!"
                  isFetchingNextPage={isFetchingNextPage}
                  hasNextPage={hasNextPage}
                  hasData={!!columns?.length}
                  ref={loadMoreRef}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </FadeIn>
    </Section>
  );
};

export default Columns;
