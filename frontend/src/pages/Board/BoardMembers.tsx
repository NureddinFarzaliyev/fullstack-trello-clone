import { UsersIcon } from "lucide-react";
import Modal from "../../shared/ui/modal/Modal";
import { useBoardMembers } from "../../api/queries/useMembersQuery";
import Avatar from "../../shared/ui/avatar/Avatar";
import Spinner from "../../shared/ui/loading/Spinner";
import FadeIn from "../../shared/ui/animation/FadeIn";

import InviteMember from "./InviteMember";
import RevokeMember from "./RevokeMember";

const BoardMembers = ({
  boardId,
  isOwner,
}: {
  boardId: string;
  isOwner: boolean;
}) => {
  const { data, isPending } = useBoardMembers(boardId);

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
                  {isOwner && d.role !== "OWNER" && (
                    <RevokeMember boardId={boardId} memberId={d.id ?? 0} />
                  )}
                </div>
              ))}
              {isOwner && <InviteMember boardId={boardId} />}
            </FadeIn>
          )
        }
      />
    </div>
  );
};

export default BoardMembers;
