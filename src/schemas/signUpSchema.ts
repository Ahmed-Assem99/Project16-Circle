import * as zod from "zod";
import { regex } from "../utils/regex";
import { getAge } from "../utils/helpers";

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 chars")
      .max(20, "Name must be at most 20 chars."),
    email: zod
      .string()
      .nonempty("Email is required")
      .regex(regex.email, "Enter valid Email"),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        regex.password,
        "requires a minimum of 8 characters, including at least one lowercase letter, one uppercase letter, one number, and one special character",
      ),
    rePassword: zod.string().nonempty("Confirm Password is required"),
    dateOfBirth: zod
      .string()
      .nonempty("Date of Birth is required")
      .refine((date) => getAge(date) >= 18, "Age must be at least 18"),
    gender: zod
      .string()
      .nonempty("Gender is required")
      .regex(regex.gender, "Gender must be Male or Female"),
  })
  .refine((data) => data.password == data.rePassword, {
    message: "Confirm Password and Password must match",
    path: ["rePassword"],
  });
