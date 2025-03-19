import { z } from "zod";
export const loginSchema = z.object({
  identity: z.string().nonempty("Email or phone is required"),
  password: z.string().nonempty("Password is required"),
});
