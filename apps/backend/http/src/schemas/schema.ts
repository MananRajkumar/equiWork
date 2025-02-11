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

export const deleteUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16)
});

export const editUserSchema = z.object({
    fullName: z.string().optional(),
    languages: z.array(z.string()).optional(),
    profilePic: z.string().optional()
});

export const makePostSchema = z.object({
    title: z.string(),
    description: z.string(),
    skillRequired: z.array(z.string()),
    status: z.enum(["open", "closed"])
});

export const editPostSchema = z.object({
    title: z.string(),
    description: z.string(),
    skillRequired: z.array(z.string()),
    status: z.enum(["open", "closed"])
});

export const applyPostSchema = z.object({
    description: z.string(),
});

export const updateApplicationStatusSchema = z.object({
    status: z.enum(["pending", "accepted", "rejected", "under_review"])
});

export const sendMessageSchema = z.object({
    content: z.string()
});