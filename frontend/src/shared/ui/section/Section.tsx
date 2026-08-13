import classNames from "classnames";
import type { ReactNode } from "react";

const Section = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section className={classNames("p-5 md:p-10", className)}>
      {children}
    </section>
  );
};

export default Section;
