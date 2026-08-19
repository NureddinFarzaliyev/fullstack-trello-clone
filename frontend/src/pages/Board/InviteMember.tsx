import { useState } from "react";
import Button from "../../shared/ui/form/Button";
import TextInput from "../../shared/ui/form/TextInput";
import { useToast } from "../../stores/toast.store";
import { useInviteMember } from "../../api/queries/useMembersQuery";

const InviteMember = ({ boardId }: { boardId: string }) => {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const { mutate: inviteMember, isPending: isInviting } = useInviteMember();

  const onInvite = () => {
    if (email) {
      inviteMember(
        { boardId, email },
        {
          onSuccess: () => {
            addToast({
              content: "Invitation sent successfully!",
              type: "success",
            });
          },
        },
      );
      setEmail("");
    }
  };

  return (
    <div>
      <h4 className="mt-5 mb-3 text-md font-medium">Invite Members</h4>
      <div className="flex gap-1 items-center">
        <TextInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full"
          name="email"
          type="email"
          placeholder="Type user's email"
        />
        <Button
          onClick={onInvite}
          content={isInviting ? "Inviting..." : "Invite"}
          disabled={isInviting}
        />
      </div>
    </div>
  );
};

export default InviteMember;
