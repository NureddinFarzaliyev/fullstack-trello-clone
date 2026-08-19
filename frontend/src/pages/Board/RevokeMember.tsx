import { useRevokeMember } from "../../api/queries/useMembersQuery";
import Button from "../../shared/ui/form/Button";
import { useToast } from "../../stores/toast.store";

const RevokeMember = ({
  boardId,
  memberId,
}: {
  boardId: string;
  memberId: number;
}) => {
  const { mutate: revokeMember, isPending: isRevoking } = useRevokeMember();
  const { addToast } = useToast();

  return (
    <Button
      onClick={() =>
        revokeMember(
          { boardId, boardMemberId: memberId },
          {
            onSuccess: () => {
              addToast({
                content: "Member revoked successfully!",
                type: "success",
              });
            },
          },
        )
      }
      content={isRevoking ? "Revoking..." : "Revoke"}
      disabled={isRevoking}
      className="ml-auto"
    />
  );
};

export default RevokeMember;
