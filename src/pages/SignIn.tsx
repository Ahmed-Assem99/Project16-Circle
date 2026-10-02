import { Alert, Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getInputProps } from "../utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { authServices } from "../services/authService";

import { signInSchema } from "../schemas/signInSchema";
import type { LogInData } from "../types/LogInData";
import { authContext } from "../contexts/authContext";

export default function SignIn() {
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const {setisLoggedIn}=useContext(authContext)

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
      setisLoggedIn(true);

      localStorage.setItem("token",data.data.token)
      setSuccessMsg(data.message);
      setisLoading(false);
      navigate("/");
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
    }
    setisLoading(false);
  }

  /* STYLING NOTES — SignIn (rendered inside AuthLayout's glass card)
     - `grid gap-4` stacks every field with the same 16px spacing.
     - Heading hierarchy: big bold title + small muted subtitle.
     - The submit button is full width + large, because it's THE action
       on this page.
     - The "Register now" link uses the primary color so it's clearly
       clickable (before, it looked like normal text). */
  return (
    <form onSubmit={handleSubmit(signIn)}>
      <div className="grid gap-4">
        {/* mb-2 → a bit of extra space between the heading and the inputs */}
        <div className="mb-2 grid gap-1 text-center">
          {/* text-2xl font-bold tracking-tight → strong, compact title */}
          <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
          {/* text-sm text-default-500 → smaller, muted helper text */}
          <p className="text-sm text-default-500">Sign in to continue your journey</p>
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

        {/* size="lg" + font-semibold → the main, most visible action
            mt-2 → separates the button from the last input a little */}
        <Button
          isLoading={isLoading}
          color="primary"
          variant="solid"
          type="submit"
          size="lg"
          className="mt-2 font-semibold"
        >
          Sign In
        </Button>
        {/* Muted sentence + primary-colored link (underlines on hover) */}
        <p className="text-center text-sm text-default-500">
          Don't have an account?{" "}
          <Link to={"/signup"} className="font-semibold text-primary hover:underline">Register now</Link>
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
