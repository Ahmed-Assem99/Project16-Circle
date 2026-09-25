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

  return (
    <form onSubmit={handleSubmit(signUp)}>
      <div className="grid gap-4">
        <div className="grid gap-3 text-center">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey</p>
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

        <Button
          isLoading={isLoading}
          color="primary"
          variant="solid"
          type="submit"
        >
          Sign Up
        </Button>
        <p>
          Already have an account? <Link to={"/signin"}>Login now</Link>
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
