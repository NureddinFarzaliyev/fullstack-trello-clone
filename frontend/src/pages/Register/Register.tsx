import { useState, type SubmitEventHandler } from "react";
import { useRegister } from "../../api/queries/useAuthQuery";
import type { RegisterRequestBody } from "../../api/openapi-types";
import TextInput from "../../shared/ui/form/TextInput";
import Button from "../../shared/ui/form/Button";

const Register = () => {
  const { mutate, isPending } = useRegister();

  const [data, setData] = useState<RegisterRequestBody>({
    password: "",
    email: "",
    username: "",
  });

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(data, {
      onSuccess: (data) => console.log(data),
    });
  };

  const onChange: React.ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center w-full h-dvh">
      <form onSubmit={onSubmit} className="flex gap-2 flex-col">
        <TextInput
          type="email"
          placeholder="Email"
          name="email"
          onChange={onChange}
        />
        <TextInput
          type="text"
          placeholder="Username"
          name="username"
          onChange={onChange}
        />
        <TextInput
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChange}
        />
        <Button isLoading={isPending} type="submit" content="Register" />
      </form>
    </div>
  );
};

export default Register;
