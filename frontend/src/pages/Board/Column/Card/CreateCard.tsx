import { PlusIcon } from "lucide-react";
import Modal from "../../../../shared/ui/modal/Modal";
import { useState } from "react";
import TextInput from "../../../../shared/ui/form/TextInput";
import { useCreateCard } from "../../../../api/queries/useCardsQuery";
import type { CreateCardRequestBody } from "../../../../api/openapi-types";

const CreateCard = ({
  boardId,
  columnId,
}: {
  boardId: string;
  columnId: number;
}) => {
  const [cardDetails, setCardDetails] = useState<CreateCardRequestBody>({
    title: "",
    description: "",
    due: "",
  });

  const { mutate, isPending } = useCreateCard();

  const onSubmit = () => {
    mutate(
      {
        path: {
          boardId,
          columnId,
        },
        body: cardDetails,
      },
      {
        onSuccess: () => {
          setCardDetails({
            title: "",
            description: "",
            due: "",
          });
        },
      },
    );
  };

  return (
    <Modal
      button={
        <button
          disabled={isPending}
          className="bg-(--surface-a10) py-2 px-3 flex justify-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition duration-100 w-full"
        >
          <PlusIcon size={18} />
        </button>
      }
      submitBtn={
        <button className="btn bg-(--primary-a0) mr-2" onClick={onSubmit}>
          Create
        </button>
      }
      content={
        <div className="flex flex-col gap-2">
          <label>Create Card</label>
          <TextInput
            name="card-title"
            type="text"
            placeholder="Title"
            value={cardDetails.title}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, title: e.target.value })
            }
            className="w-full mt-3"
          />
          <TextInput
            name="card-description"
            type="text"
            placeholder="Description"
            value={cardDetails.description}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, description: e.target.value })
            }
            className="w-full"
          />
          <input
            type="date"
            value={cardDetails.due}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, due: e.target.value })
            }
            className="w-full p-2 border border-white/20"
          />
        </div>
      }
    />
  );
};

export default CreateCard;
