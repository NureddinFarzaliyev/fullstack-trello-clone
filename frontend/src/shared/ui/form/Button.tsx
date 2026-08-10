import classNames from "classnames";
import type { DaisyUIColor, DaisyUISize } from "../../types/daisyui.types";

const Button = ({
  isLoading,
  type,
  className,
  content,
  disabled,
  onClick,
  size,
  color,
}: {
  isLoading?: boolean;
  type?: "submit" | "button";
  className?: string;
  content: string;
  disabled?: boolean;
  onClick?: () => void;
  size?: DaisyUISize;
  color?: DaisyUIColor;
}) => {
  return (
    <button
      disabled={isLoading || disabled}
      type={type || "button"}
      className={classNames(
        "btn",
        className,
        size ? `btn-${size}` : "",
        color ? `btn-${color}` : "",
      )}
      onClick={onClick}
    >
      {isLoading ? <span className="loading loading-spinner"></span> : content}
    </button>
  );
};

export default Button;
