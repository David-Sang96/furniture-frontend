import { z } from "zod";

export const loginFormSchema = z.object({
  phone: z
    .string()
    .regex(/^\d+$/, "Please insert a valid number")
    .min(7, "Phone number is too short")
    .max(12, "Phone number is too long"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "Password must contain at least one letter and one digit",
    )
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password is too long"),
});

export const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/^\d+$/, "Please insert a valid number")
    .min(7, "Phone number is too short")
    .max(12, "Phone number is too long"),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
        "Password must contain at least one letter and one digit",
      )
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Show error on confirmPassword field
  });
