import { Alert, Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getAge, getInputProps } from "../utils/helpers";

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
            required: "Name is required",
            minLength: { value: 3, message: "Name must be at least 3 chars" },
            maxLength: { value: 20, message: "Name must be at most 20 chars" },
          })}
          {...getInputProps("text", "Full Name")}
          isInvalid={!!errors.name?.message}
          errorMessage={errors.name?.message}
        />

        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: / ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter valid Email",
            },
          })}
          {...getInputProps("email", "Email")}
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message}
        />

        <Input
          {...register("password", {
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "requires a minimum of 8 characters, including at least one lowercase letter, one uppercase letter, one number, and one special character",
            },
          })}
          {...getInputProps("password", "Password")}
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
        />

        <Input
          {...register("rePassword", {
            required: "Confirm Password is required",
            validate: (value, formValues) => {
              return value != formValues.password
                ? "Confirm Password Must Match the entered Password"
                : undefined;
            },
          })}
          {...getInputProps("password", "Confirm Password")}
          errorMessage={errors.rePassword?.message}
          isInvalid={!!errors.rePassword?.message}
        />

        <Input
          {...register("dateOfBirth", {
            required: "Date of Birth is required",
            validate: (value) => {

              return getAge(value)<18? "Age must be at least 18":undefined;
            },
          })}
          {...getInputProps("date", "Birth Date")}
          errorMessage={errors.dateOfBirth?.message}
          isInvalid={!!errors.dateOfBirth?.message}
        />

        <Select
          {...register("gender", {
            required: "Name is required",
            pattern:{value:/^(male|female)$/,message:"Gender must be Male or Female"}
          })}
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
