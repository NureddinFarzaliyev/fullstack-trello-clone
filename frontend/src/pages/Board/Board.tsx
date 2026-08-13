import { Link, useParams } from "react-router";
import { useBoard } from "../../api/queries/useBoardsQuery";
import FullPageSpinner from "../../shared/ui/loading/FullPageSpinner";
import Section from "../../shared/ui/section/Section";
import { ChevronLeft } from "lucide-react";
import FadeIn from "../../shared/ui/animation/FadeIn";

const Board = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending } = useBoard(id ?? "");

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
      </Section>
    </FadeIn>
  );
};

export default Board;
