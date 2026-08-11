import classNames from "classnames";

const Avatar = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className="avatar avatar-placeholder">
      <div
        className={classNames(
          "bg-(--surface-tonal-a0) ring-2 ring-(--primary-a0) text-neutral-content w-24 rounded-full text-3xl",
          className,
        )}
      >
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Avatar;
