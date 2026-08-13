import { useBoardColumns } from "../../api/queries/useColumnsQuery";
import HorizontalFullSpinner from "../../shared/ui/loading/HorizontalFullSpinner";
import { useRef } from "react";
import InfiniteScrollTrigger from "../../shared/ui/infiniteScroll/InfiniteScrollTrigger";
import { useIntersectionObserver } from "../../shared/hooks/useIntersectionObserver";
import FadeIn from "../../shared/ui/animation/FadeIn";
import Section from "../../shared/ui/section/Section";
import ColumnCard from "./ColumnCard";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { useUpdateColumn } from "../../api/queries/useColumnsQuery";
import CreateColumn from "./CreateColumn";

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
  const { mutateAsync: updateColumn } = useUpdateColumn();

  const columns = columnsPages?.pages.flatMap((page) => page.content) ?? [];

  return isColumnsPending ? (
    <HorizontalFullSpinner />
  ) : (
    <Section className="overflow-visible!">
      <FadeIn>
        <DragDropProvider
          onDragEnd={(event) => {
            const { source } = event.operation;
            if (isSortable(source) && source.type === "column") {
              updateColumn({
                boardId: id ?? "",
                columnId: source.id as number,
                body: { position: source.index },
              });
            }
          }}
        >
          <div className="flex gap-4 overflow-x-auto">
            {columns.map((c, i) => (
              <ColumnCard key={c?.id} column={c} index={i} />
            ))}
            <CreateColumn boardId={id} />
            <InfiniteScrollTrigger
              className="min-w-14 h-14! mt-0!"
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              hasData={!!columns?.length}
              ref={loadMoreRef}
            />
          </div>
        </DragDropProvider>
      </FadeIn>
    </Section>
  );
};

export default Columns;
