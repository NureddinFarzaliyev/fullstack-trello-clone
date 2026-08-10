import { useState, type SubmitEventHandler } from "react";
import { useRegister } from "../../api/queries/useAuthQuery";
import type { RegisterRequestBody } from "../../api/openapi-types";
import TextInput from "../../shared/ui/form/TextInput";
import Button from "../../shared/ui/form/Button";
import { Link, useNavigate } from "react-router";
import { useToast } from "../../stores/toast.store";

const Register = () => {
  const { mutate, isPending } = useRegister();

  const [data, setData] = useState<RegisterRequestBody>({
    password: "",
    email: "",
    username: "",
  });

  const navigate = useNavigate();
  const { addToast } = useToast();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate(data, {
      onSuccess: () => {
        addToast({
          type: "success",
          content: "Registered successfully, please login",
        });
        navigate("/login");
      },
    });
  };

  const onChange: React.ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center w-full h-dvh flex-col gap-3">
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
      <Link to="/login" className="text-sm underline">
        Already have an account? Login
      </Link>
    </div>
  );
};

export default Register;
