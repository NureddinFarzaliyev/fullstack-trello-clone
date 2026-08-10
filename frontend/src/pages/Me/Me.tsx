import { useLogout, useMe } from "../../api/queries/useAuthQuery";
import Avatar from "../../shared/ui/avatar/Avatar";
import Button from "../../shared/ui/form/Button";

const Me = () => {
  const { data, isPending } = useMe();
  const { mutate, isPending: isLogoutPending } = useLogout();

  return (
    <div className="flex justify-between items-center w-full p-10 bg-(--surface-a0)">
      <div className="flex items-center gap-8">
        <Avatar text={data?.username?.charAt(0).toUpperCase() || "?"} />
        <div>
          <p className="text-5xl">{data?.username}</p>
          <p className="text-xl opacity-70">{data?.email}</p>
        </div>
      </div>
      <Button
        onClick={() => mutate()}
        disabled={isPending || isLogoutPending}
        content="Log out"
        isLoading={isPending || isLogoutPending}
        size="lg"
        color="error"
      />
    </div>
  );
};

export default Me;
