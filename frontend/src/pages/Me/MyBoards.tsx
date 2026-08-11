import { useDefaultBoard } from "../../api/queries/useBoardsQuery";
import FadeIn from "../../shared/ui/animation/FadeIn";
import HorizontalFullSpinner from "../../shared/ui/loading/HorizontalFullSpinner";
import SectionHeader from "../../shared/ui/section/SectionHeader";
import BoardCard from "./BoardCard";

const MyBoards = () => {
  const { data, isPending } = useDefaultBoard();

  return (
    <div>
      <SectionHeader text="Your Boards" />
      {isPending ? (
        <HorizontalFullSpinner />
      ) : (
        <FadeIn>
          <BoardCard board={data} />
        </FadeIn>
      )}
    </div>
  );
};

export default MyBoards;
