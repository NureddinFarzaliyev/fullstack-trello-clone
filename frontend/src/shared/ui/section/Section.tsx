import type { ReactNode } from "react";

const Section = ({ children }: { children: ReactNode }) => {
  return <section className="p-5 md:p-10">{children}</section>;
};

export default Section;
