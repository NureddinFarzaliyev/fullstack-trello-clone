import { TrashIcon } from "lucide-react";
import { useDeleteColumn } from "../../../api/queries/useColumnsQuery";
import Modal from "../../../shared/ui/modal/Modal";

const DeleteColumn = ({
  boardId,
  columnId,
}: {
  boardId: string;
  columnId: number;
}) => {
  const { mutate, isPending } = useDeleteColumn();

  const onSubmit = async () => {
    mutate({ boardId, columnId });
  };

  return (
    <Modal
      button={
        <button
          className="p-1 bg-(--surface-a20) shrink-0 cursor-pointer hover:bg-(--surface-a10) transition duration-100"
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
            Are you sure you want to delete this column? This action cannot be
            undone.
          </p>
        </div>
      }
    />
  );
};

export default DeleteColumn;
