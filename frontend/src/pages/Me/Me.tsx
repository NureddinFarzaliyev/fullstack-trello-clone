import { useLogout, useMe } from "../../api/queries/useAuthQuery";

const Me = () => {
  const { data, isPending } = useMe();
  const { mutate, isPending: isLogoutPending } = useLogout();

  return (
    <div>
      <ul>
        <li>id: {data?.id}</li>
        <li>email: {data?.email}</li>
        <li>username: {data?.username}</li>
      </ul>
      <button onClick={() => mutate()} disabled={isPending || isLogoutPending}>
        {isLogoutPending ? "Logging" : "Log"} out
      </button>
    </div>
  );
};

export default Me;
