const Button = ({
  isLoading,
  type,
  className,
  content,
  disabled,
}: {
  isLoading: boolean;
  type?: "submit" | "button";
  className?: string;
  content: string;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={isLoading || disabled}
      type={type || "button"}
      className={`btn ${className}`}
    >
      {isLoading ? <span className="loading loading-spinner"></span> : content}
    </button>
  );
};

export default Button;
