import { PlusIcon } from "lucide-react";
import Modal from "../../shared/ui/modal/Modal";
import { useState } from "react";
import TextInput from "../../shared/ui/form/TextInput";
import { useCreateColumn } from "../../api/queries/useColumnsQuery";
import Spinner from "../../shared/ui/loading/Spinner";

const CreateColumn = ({ boardId }: { boardId: string }) => {
  const [columnName, setColumnName] = useState("");
  const { mutate, isPending } = useCreateColumn();

  const onSubmit = async () => {
    mutate({ boardId, body: { title: columnName } });
    setColumnName("");
  };

  return (
    <Modal
      button={
        <button
          className="h-14 w-14 bg-(--surface-a20) shrink-0 cursor-pointer hover:bg-(--surface-a10) transition duration-100"
          disabled={isPending}
        >
          {isPending ? <Spinner /> : <PlusIcon className="mx-auto my-auto" />}
        </button>
      }
      submitBtn={
        <button className="btn bg-(--primary-a0) mr-2" onClick={onSubmit}>
          Create
        </button>
      }
      content={
        <div className="flex flex-col gap-2">
          <label htmlFor="column-name">Column Name</label>
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

export default CreateColumn;
