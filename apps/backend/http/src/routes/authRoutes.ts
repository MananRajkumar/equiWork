import { Router } from "express";
import { login, signup, getAllUsers, deleteAllUsers, deleteUser } from "../controllers/authController";
import { inputValidator } from "../utils/middlewares";
import { loginSchema, signUpSchema } from "../schemas/schema";


const router = Router();

router.get("/get-all-users", getAllUsers);

router.post('/signup', inputValidator(signUpSchema), signup);

router.post('/login', inputValidator(loginSchema), login);

router.delete('/delete-user', deleteUser);

router.delete('/delete-all-users', deleteAllUsers);

export default router;