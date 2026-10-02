import { Alert, Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getInputProps } from "../utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../schemas/signUpSchema";

import { useState } from "react";
import { authServices } from "../services/authService";
import type { RegisterData } from "../types/RegisterData";

export default function SignUp() {
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [isLoading, setisLoading] = useState(false);
const navigate = useNavigate()


  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  async function signUp(values: RegisterData) {
    setErrorMsg("");
    setSuccessMsg("");
    setisLoading(true);
    try {
      //Validation
      //send Data to BE
      const data = await authServices.signUp(values);
      setSuccessMsg(data.message);
      setisLoading(false);
      navigate("/signin")
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
    }
    setisLoading(false);
  }

  /* STYLING NOTES — SignUp (same look as SignIn, so both pages feel alike)
     - Related fields are grouped in pairs with a responsive grid:
       `grid gap-4 sm:grid-cols-2` → stacked (1 column) on phones,
       side-by-side (2 columns) from 640px and up. This makes the long
       form shorter on desktop.
     - The heading text was copied from SignIn ("Welcome Back"), so it now
       says what this page actually does. */
  return (
    <form onSubmit={handleSubmit(signUp)}>
      <div className="grid gap-4">
        <div className="mb-2 grid gap-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
          <p className="text-sm text-default-500">Join Circle and connect with your friends</p>
        </div>

        <Input
          {...register("name")}
          {...getInputProps("text", "Full Name")}
          isInvalid={!!errors.name?.message}
          errorMessage={errors.name?.message}
        />

        <Input
          {...register("email")}
          {...getInputProps("email", "Email")}
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message}
        />

        {/* Pair 1: password + confirm (side by side on sm+ screens) */}
        <div className="grid gap-4 sm:grid-cols-2">
        <Input
          {...register("password")}
          {...getInputProps("password", "Password")}
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
        />

        <Input
          {...register("rePassword")}
          {...getInputProps("password", "Confirm Password")}
          errorMessage={errors.rePassword?.message}
          isInvalid={!!errors.rePassword?.message}
        />
        </div>

        {/* Pair 2: birth date + gender (side by side on sm+ screens) */}
        <div className="grid gap-4 sm:grid-cols-2">
        <Input
          {...register("dateOfBirth")}
          {...getInputProps("date", "Birth Date")}
          errorMessage={errors.dateOfBirth?.message}
          isInvalid={!!errors.dateOfBirth?.message}
        />

        <Select
          {...register("gender")}
          {...getInputProps(undefined, "Gender")}
          errorMessage={errors.gender?.message}
          isInvalid={!!errors.gender?.message}
        >
          <SelectItem key="male">Male</SelectItem>
          <SelectItem key="female">Female</SelectItem>
        </Select>
        </div>

        {/* Same big full-width primary button as SignIn */}
        <Button
          isLoading={isLoading}
          color="primary"
          variant="solid"
          type="submit"
          size="lg"
          className="mt-2 font-semibold"
        >
          Sign Up
        </Button>
        <p className="text-center text-sm text-default-500">
          Already have an account?{" "}
          <Link to={"/signin"} className="font-semibold text-primary hover:underline">Login now</Link>
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
