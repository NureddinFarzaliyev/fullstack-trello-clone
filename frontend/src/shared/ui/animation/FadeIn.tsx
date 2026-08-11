import type { ReactNode } from "react";

const FadeIn = ({ children }: { children: ReactNode }) => {
  return <div className="animate-fade-in">{children}</div>;
};

export default FadeIn;
