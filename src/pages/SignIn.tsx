import { Alert, Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getInputProps } from "../utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { authServices } from "../services/authService";
import type { RegisterData } from "../types/RegisterData";
import { signInSchema } from "../schemas/signInSchema";
import type { LogInData } from "../types/LogInData";

export default function SignIn() {
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  async function signIn(values: LogInData) {
    setErrorMsg("");
    setSuccessMsg("");
    setisLoading(true);
    try {
      //Validation
      //send Data to BE
      const data = await authServices.signIn(values);
      setSuccessMsg(data.message);
      setisLoading(false);
      navigate("/");
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
    }
    setisLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(signIn)}>
      <div className="grid gap-4">
        <div className="grid gap-3 text-center">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey</p>
        </div>



        <Input
          {...register("email")}
          {...getInputProps("email", "Email")}
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message}
        />

        <Input
          {...register("password")}
          {...getInputProps("password", "Password")}
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
        />


        <Button
          isLoading={isLoading}
          color="primary"
          variant="solid"
          type="submit"
        >
          Sign In
        </Button>
        <p>
          You Don't have an account? <Link to={"/signup"}>Register now</Link>
        </p>
        {ErrorMsg && (
          <Alert
            hideIcon
            color="danger"
            title={ErrorMsg}
            variant="faded"
            classNames={{ base: "py-0 capitalize text-center" }}
          />
        )}
        {SuccessMsg && (
          <Alert
            hideIcon
            color="success"
            title={SuccessMsg}
            variant="faded"
            classNames={{ base: "py-0 capitalize text-center" }}
          />
        )}
      </div>
    </form>
  );
}
