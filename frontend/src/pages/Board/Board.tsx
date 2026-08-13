import { Link, useParams } from "react-router";
import { useBoard } from "../../api/queries/useBoardsQuery";
import FullPageSpinner from "../../shared/ui/loading/FullPageSpinner";
import Section from "../../shared/ui/section/Section";
import { ChevronLeft } from "lucide-react";
import FadeIn from "../../shared/ui/animation/FadeIn";
import { useBoardColumns } from "../../api/queries/useColumnsQuery";
import HorizontalFullSpinner from "../../shared/ui/loading/HorizontalFullSpinner";
import { useRef } from "react";
import InfiniteScrollTrigger from "../../shared/ui/infiniteScroll/InfiniteScrollTrigger";
import { useIntersectionObserver } from "../../shared/hooks/useIntersectionObserver";

const Board = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending } = useBoard(id ?? "");
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

  const columns = columnsPages?.pages.flatMap((page) => page.content) ?? [];

  return isPending ? (
    <FullPageSpinner />
  ) : (
    <FadeIn>
      <Section>
        <div className="flex items-center gap-2">
          <Link to="/me" className="opacity-60 hover:opacity-100 transition">
            <ChevronLeft size={32} />
          </Link>
          <h3 className="text-xl">{data?.title}</h3>
        </div>
        {isColumnsPending ? (
          <HorizontalFullSpinner />
        ) : (
          <Section>
            <FadeIn>
              {columns.map((c) => (
                <div>{c?.title}</div>
              ))}
              <InfiniteScrollTrigger
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={hasNextPage}
                hasData={!!columns?.length}
                ref={loadMoreRef}
              />
            </FadeIn>
          </Section>
        )}
      </Section>
    </FadeIn>
  );
};

export default Board;
