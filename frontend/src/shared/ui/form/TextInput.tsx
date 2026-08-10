const TextInput = ({
  type = "text",
  placeholder,
  name,
  onChange,
  className,
}: {
  type: "text" | "email" | "password";
  placeholder: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}) => {
  return (
    <input
      className={`input ${className}`}
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
    />
  );
};

export default TextInput;
