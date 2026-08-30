import { Circle, CircleCheck } from "lucide-react";
import { useState } from "react";
import { useUpdateCard } from "../../../../api/queries/useCardsQuery";

const CompleteCard = ({
  boardId,
  columnId,
  cardId,
  completed,
  setCompleted,
}: {
  boardId: string;
  columnId: number;
  cardId: number;
  completed: boolean | undefined;
  setCompleted: (completed: boolean) => void;
}) => {
  const { mutate, isPending } = useUpdateCard();
  const [compltedState, setCompletedState] = useState(completed);

  const onSubmit = () => {
    mutate({
      path: {
        boardId,
        columnId,
        cardId,
      },
      body: {
        completed: !compltedState,
      },
    });
    setCompletedState(!compltedState);
    setCompleted(!compltedState);
  };

  return (
    <button
      className="p-1 shrink-0 cursor-pointer hover:bg-(--surface-a30) transition duration-100"
      disabled={isPending}
      onClick={onSubmit}
    >
      {compltedState ? (
        <CircleCheck className="mx-auto my-auto" size={16} />
      ) : (
        <Circle className="mx-auto my-auto" size={16} />
      )}
    </button>
  );
};

export default CompleteCard;
