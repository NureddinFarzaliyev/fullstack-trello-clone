import { UsersIcon } from "lucide-react";
import Modal from "../../shared/ui/modal/Modal";
import {
  useBoardMembers,
  useInviteMember,
} from "../../api/queries/useMembersQuery";
import Avatar from "../../shared/ui/avatar/Avatar";
import Spinner from "../../shared/ui/loading/Spinner";
import FadeIn from "../../shared/ui/animation/FadeIn";
import TextInput from "../../shared/ui/form/TextInput";
import Button from "../../shared/ui/form/Button";
import { useState } from "react";
import { useToast } from "../../stores/toast.store";

const BoardMembers = ({ boardId }: { boardId: string }) => {
  const { data, isPending } = useBoardMembers(boardId);
  const { mutate: inviteMember, isPending: isInviting } = useInviteMember();
  const { addToast } = useToast();
  const [email, setEmail] = useState("");

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
      <Modal
        button={
          <div className="cursor-pointer opacity-80 hover:opacity-100 transition">
            <UsersIcon />
          </div>
        }
        content={
          isPending ? (
            <div className="flex items-center justify-center w-full h-40">
              <Spinner />
            </div>
          ) : (
            <FadeIn>
              {data?.map((d) => (
                <div className="bg-(--surface-a0) p-3 my-2 flex gap-3 items-center">
                  <Avatar
                    text={d.user?.username?.slice(0, 1) ?? ""}
                    className="h-10! w-10! text-lg!"
                  />
                  <div>
                    <p className="text-lg">{d.user?.username}</p>
                    <p className="text-sm opacity-50">
                      {d.role} | {d.user?.email}
                    </p>
                  </div>
                </div>
              ))}
              <div>
                <h4 className="mt-5 mb-3 text-md font-medium">
                  Invite Members
                </h4>
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
            </FadeIn>
          )
        }
      />
    </div>
  );
};

export default BoardMembers;
