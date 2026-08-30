import { EditIcon } from "lucide-react";
import { useState } from "react";
import { useUpdateCard } from "../../../../api/queries/useCardsQuery";
import type { UpdateCardRequestBody } from "../../../../api/openapi-types";
import Modal from "../../../../shared/ui/modal/Modal";
import TextInput from "../../../../shared/ui/form/TextInput";

const UpdateCard = ({
  boardId,
  columnId,
  cardId,
}: {
  boardId: string;
  columnId: number;
  cardId: number;
}) => {
  const [cardDetails, setCardDetails] = useState<UpdateCardRequestBody>({
    title: "",
    description: "",
    due: "",
  });
  const { mutate, isPending } = useUpdateCard();

  const onSubmit = async () => {
    mutate({
      path: {
        boardId,
        columnId,
        cardId,
      },
      body: cardDetails,
    });
  };

  return (
    <Modal
      button={
        <button
          className="p-1 shrink-0 cursor-pointer hover:bg-(--surface-a30) transition duration-100"
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

export default UpdateCard;
