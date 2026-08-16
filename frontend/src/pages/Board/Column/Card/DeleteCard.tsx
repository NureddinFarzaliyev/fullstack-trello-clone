import { TrashIcon } from "lucide-react";
import { useDeleteCard } from "../../../../api/queries/useCardsQuery";
import Modal from "../../../../shared/ui/modal/Modal";

const DeleteCard = ({
  boardId,
  columnId,
  cardId,
}: {
  boardId: string;
  columnId: number;
  cardId: number;
}) => {
  const { mutate, isPending } = useDeleteCard();

  const onSubmit = async () => {
    mutate({ boardId, columnId, cardId });
  };

  return (
    <Modal
      button={
        <button
          className="p-1 shrink-0 cursor-pointer hover:bg-(--surface-a30) transition duration-100"
          disabled={isPending}
        >
          <TrashIcon className="mx-auto my-auto" size={16} />
        </button>
      }
      submitBtn={
        <button className="btn bg-(--primary-a0) mr-2" onClick={onSubmit}>
          Delete
        </button>
      }
      content={
        <div className="flex flex-col gap-2">
          <label htmlFor="column-name">Delete Column</label>
          <p className="text-sm text-(--text-secondary)">
            Are you sure you want to delete this card? This action cannot be
            undone.
          </p>
        </div>
      }
    />
  );
};

export default DeleteCard;
