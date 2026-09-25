import { Alert, Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getInputProps } from "../utils/helpers";

export default function SignUp() {
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
  });

  console.log(errors.name?.message);

  async function signUp(values: any) {
    //Validation
    //send Data to BE
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(signUp)}>
      <div className="grid gap-4">
        <div className="grid gap-3 text-center">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey</p>
        </div>

        <Input
          {...register("name", {
            required: "Name input is required",
            minLength: { value: 3, message: "Name must be at least 3 chars" },
            maxLength: {value:20, message:"Name must be at most 20 chars"},
          })}
          {...getInputProps("text", "Full Name")}
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name?.message}
        />

        <Input {...register("email")} {...getInputProps("email", "Email")} />

        <Input
          {...register("password", {})}
          {...getInputProps("password", "Password")}
        />

        <Input
          {...register("rePassword")}
          {...getInputProps("password", "Confirm Password")}
        />

        <Input
          {...register("dateOfBirth")}
          {...getInputProps("date", "Birth Date")}
        />

        <Select {...register("gender")} {...getInputProps(undefined, "Gender")}>
          <SelectItem key="male">Male</SelectItem>
          <SelectItem key="female">Female</SelectItem>
        </Select>

        <Button isLoading={false} color="primary" variant="solid" type="submit">
          Sign Up
        </Button>
        <p>
          Already have an account? <Link to={"/signin"}>Login now</Link>
        </p>
        <Alert
          hideIcon
          color="danger"
          title={"errMsg"}
          variant="faded"
          classNames={{ base: "py-0 capitalize text-center" }}
        />
      </div>
    </form>
  );
}
