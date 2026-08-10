import { useState, type SubmitEventHandler } from "react";
import type { LoginRequestBody } from "../../api/openapi-types";
import { useLogin } from "../../api/queries/useAuthQuery";
import TextInput from "../../shared/ui/form/TextInput";
import Button from "../../shared/ui/form/Button";

const Login = () => {
  const { mutate, isPending } = useLogin();

  const [data, setData] = useState<LoginRequestBody>({
    password: "",
    email: "",
  });

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(data);
  };

  const onChange: React.ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (e) => {
    setData({ ...data, [e.target.type]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center w-full h-dvh">
      <form onSubmit={onSubmit} className="flex gap-2 flex-col">
        <TextInput
          name="email"
          type="email"
          placeholder="Email"
          onChange={onChange}
        />
        <TextInput
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
        />
        <Button isLoading={isPending} type="submit" content="Login" />
      </form>
    </div>
  );
};

export default Login;
