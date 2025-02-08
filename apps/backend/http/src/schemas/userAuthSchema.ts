import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
    role: z.enum(["user", "admin", "company"])
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16)
});