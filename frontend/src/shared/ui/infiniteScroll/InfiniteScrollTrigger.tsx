import classNames from "classnames";
import { forwardRef, type ReactNode } from "react";
import Spinner from "../loading/Spinner";

interface InfiniteScrollTriggerProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  hasData: boolean;
  loadingText?: string | ReactNode;
  endText?: string;
  className?: string;
}

const InfiniteScrollTrigger = forwardRef<
  HTMLDivElement,
  InfiniteScrollTriggerProps
>(
  (
    {
      isFetchingNextPage,
      hasNextPage,
      hasData,
      loadingText = <Spinner />,
      endText,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(
          "h-20 flex items-center justify-center mt-4 w-full",
          className,
        )}
      >
        {isFetchingNextPage && (
          <span className="text-sm opacity-50 animate-pulse">
            {loadingText}
          </span>
        )}

        {!hasNextPage && hasData && endText && (
          <span className="text-sm opacity-30 italic">{endText}</span>
        )}
      </div>
    );
  },
);

InfiniteScrollTrigger.displayName = "InfiniteScrollTrigger";

export default InfiniteScrollTrigger;
