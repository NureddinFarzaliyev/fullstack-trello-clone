import { EditIcon } from "lucide-react";
import { useUpdateColumn } from "../../../api/queries/useColumnsQuery";
import Modal from "../../../shared/ui/modal/Modal";
import TextInput from "../../../shared/ui/form/TextInput";
import { useState } from "react";

const UpdateColumn = ({
  boardId,
  columnId,
}: {
  boardId: string;
  columnId: number;
}) => {
  const [columnName, setColumnName] = useState("");
  const { mutate, isPending } = useUpdateColumn();

  const onSubmit = async () => {
    mutate({
      path: { boardId, columnId },
      body: {
        title: columnName,
      },
    });
  };

  return (
    <Modal
      button={
        <button
          className="p-1 bg-(--surface-a20) shrink-0 cursor-pointer hover:bg-(--surface-a10) transition duration-100"
          disabled={isPending}
        >
          <EditIcon className="mx-auto my-auto" size={16} />
        </button>
      }
      submitBtn={
        <button className="btn bg-(--primary-a0) mr-2" onClick={onSubmit}>
          Update
        </button>
      }
      content={
        <div className="flex flex-col gap-2">
          <label htmlFor="column-name">Update Column</label>
          <TextInput
            className="w-full! mt-3"
            type="text"
            name="column-name"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
          />
        </div>
      }
    />
  );
};

export default UpdateColumn;
