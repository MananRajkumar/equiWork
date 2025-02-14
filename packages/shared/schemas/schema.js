"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageSchema = exports.updateApplicationStatusSchema = exports.applyPostSchema = exports.editPostSchema = exports.makePostSchema = exports.editUserSchema = exports.deleteUserSchema = exports.loginSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(16),
    role: zod_1.z.enum(["user", "admin", "company"])
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(16)
});
exports.deleteUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(16)
});
exports.editUserSchema = zod_1.z.object({
    fullName: zod_1.z.string().optional(),
    languages: zod_1.z.array(zod_1.z.string()).optional(),
    profilePic: zod_1.z.string().optional()
});
exports.makePostSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    skillRequired: zod_1.z.array(zod_1.z.string()),
    status: zod_1.z.enum(["open", "closed"])
});
exports.editPostSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    skillRequired: zod_1.z.array(zod_1.z.string()),
    status: zod_1.z.enum(["open", "closed"])
});
exports.applyPostSchema = zod_1.z.object({
    description: zod_1.z.string(),
});
exports.updateApplicationStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["pending", "accepted", "rejected", "under_review"])
});
exports.sendMessageSchema = zod_1.z.object({
    content: zod_1.z.string()
});
