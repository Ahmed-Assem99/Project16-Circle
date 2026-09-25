import { Alert, Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getInputProps } from "../utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../schemas/signUpSchema";



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
    resolver: zodResolver(schema),
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
