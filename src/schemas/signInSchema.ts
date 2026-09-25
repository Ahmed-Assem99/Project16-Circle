import * as zod from "zod";
import { regex } from "../utils/regex";


export const signInSchema = zod.object({
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
});
