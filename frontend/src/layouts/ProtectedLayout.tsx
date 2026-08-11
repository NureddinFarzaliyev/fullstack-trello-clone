import { Outlet, useNavigate } from "react-router";
import { useMe } from "../api/queries/useAuthQuery";
import { useEffect } from "react";
import FullPageSpinner from "../shared/ui/loading/FullPageSpinner";
import FadeIn from "../shared/ui/animation/FadeIn";

const ProtectedLayout = ({ reverse = false }: { reverse?: boolean }) => {
  const { data, isPending } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !data && !reverse) {
      navigate("/login");
    } else if (!isPending && data && reverse) navigate("/me");
  }, [data, isPending, navigate, reverse]);

  if (reverse) {
    return !isPending && !data ? (
      <FadeIn>
        <Outlet />
      </FadeIn>
    ) : (
      <FullPageSpinner />
    );
  } else {
    return !isPending && data ? (
      <FadeIn>
        <Outlet />
      </FadeIn>
    ) : (
      <FullPageSpinner />
    );
  }
};

export default ProtectedLayout;
