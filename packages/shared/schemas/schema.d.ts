import { z } from "zod";
export declare const signUpSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodEnum<["user", "admin", "company"]>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    role: "user" | "admin" | "company";
}, {
    email: string;
    password: string;
    role: "user" | "admin" | "company";
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const deleteUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const editUserSchema: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    languages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    profilePic: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fullName?: string | undefined;
    languages?: string[] | undefined;
    profilePic?: string | undefined;
}, {
    fullName?: string | undefined;
    languages?: string[] | undefined;
    profilePic?: string | undefined;
}>;
export declare const makePostSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    skillRequired: z.ZodArray<z.ZodString, "many">;
    status: z.ZodEnum<["open", "closed"]>;
}, "strip", z.ZodTypeAny, {
    status: "open" | "closed";
    title: string;
    description: string;
    skillRequired: string[];
}, {
    status: "open" | "closed";
    title: string;
    description: string;
    skillRequired: string[];
}>;
export declare const editPostSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    skillRequired: z.ZodArray<z.ZodString, "many">;
    status: z.ZodEnum<["open", "closed"]>;
}, "strip", z.ZodTypeAny, {
    status: "open" | "closed";
    title: string;
    description: string;
    skillRequired: string[];
}, {
    status: "open" | "closed";
    title: string;
    description: string;
    skillRequired: string[];
}>;
export declare const applyPostSchema: z.ZodObject<{
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
}, {
    description: string;
}>;
export declare const updateApplicationStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["pending", "accepted", "rejected", "under_review"]>;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "accepted" | "rejected" | "under_review";
}, {
    status: "pending" | "accepted" | "rejected" | "under_review";
}>;
export declare const sendMessageSchema: z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
}, {
    content: string;
}>;
export type ApplyPost = z.infer<typeof applyPostSchema>;
