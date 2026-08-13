const TextInput = ({
  type = "text",
  placeholder,
  name,
  onChange,
  className,
  value,
}: {
  type: "text" | "email" | "password";
  placeholder?: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  value?: string;
}) => {
  return (
    <input
      className={`input ${className}`}
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextInput;
