import { useLogout, useMe } from "../../api/queries/useAuthQuery";
import Avatar from "../../shared/ui/avatar/Avatar";
import Button from "../../shared/ui/form/Button";
import Section from "../../shared/ui/section/Section";
import MyBoards from "./MyBoards";

const Me = () => {
  const { data, isPending } = useMe();
  const { mutate, isPending: isLogoutPending } = useLogout();

  return (
    <Section>
      <div className="flex justify-between items-center w-full p-5 md:p-10 bg-(--surface-a0) max-md:flex-col max-md:gap-4 mb-4 md:mb-10">
        <div className="flex items-center gap-4 md:gap-8">
          <Avatar
            text={data?.username?.charAt(0).toUpperCase() || "?"}
            className="w-14! text-xl! md:text-3xl! md:w-24!"
          />
          <div>
            <p className="text-2xl md:text-5xl">{data?.username}</p>
            <p className="text-md md:text-xl opacity-70">{data?.email}</p>
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
      <MyBoards />
    </Section>
  );
};

export default Me;
