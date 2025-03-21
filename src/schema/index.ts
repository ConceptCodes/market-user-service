import { z } from "zod";

const phoneNumber = z
  .string()
  .refine(
    (val) => /^\d{10}$/.test(val),
    "Phone number must be exactly 10 digits"
  );

export const updateUserSchema = z.object({
  id: z.number(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: phoneNumber.optional(),
});

export const getUserSchema = z.object({
  id: z.number(),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber,
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type GetUserSchema = z.infer<typeof getUserSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
