import { PlusIcon } from "lucide-react";

const CreateColumn = ({ boardId }: { boardId: string }) => {
  return (
    <button className="h-14 w-14 bg-(--surface-a20) shrink-0 cursor-pointer hover:bg-(--surface-a10) transition duration-100">
      <PlusIcon className="mx-auto my-auto" />
    </button>
  );
};

export default CreateColumn;
