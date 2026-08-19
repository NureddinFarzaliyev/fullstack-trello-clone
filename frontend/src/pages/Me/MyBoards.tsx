import { useBoards } from "../../api/queries/useBoardsQuery";
import FadeIn from "../../shared/ui/animation/FadeIn";
import HorizontalFullSpinner from "../../shared/ui/loading/HorizontalFullSpinner";
import SectionHeader from "../../shared/ui/section/SectionHeader";
import BoardCard from "./BoardCard";

const MyBoards = () => {
  const { data, isPending } = useBoards();

  return (
    <div>
      <SectionHeader text="Your Boards" />
      {isPending ? (
        <HorizontalFullSpinner />
      ) : (
        <FadeIn>
          <div className="flex flex-col gap-2">
            {data?.map((board) => <BoardCard board={board} />)}
          </div>
        </FadeIn>
      )}
    </div>
  );
};

export default MyBoards;
