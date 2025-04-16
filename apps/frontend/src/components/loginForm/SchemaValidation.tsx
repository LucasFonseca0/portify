import { z } from "zod";

export const schema = z.object({
  username: z
    .string()
    .min(3, { message: "This field must have at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "This field must have at least 6 characters" }),
});
