import { Router } from "express";
import { login, signup, getAllUsers, deleteAllUsers } from "../controllers/authController";
import { inputValidator } from "../utils/middlewares";
import { loginSchema, signUpSchema } from "../schemas/userAuthSchema";


const router = Router();

router.delete('/delete-all-users', deleteAllUsers);
router.get("/get-all-users", getAllUsers);
router.post('/login', inputValidator(loginSchema), login);
router.post('/signup', inputValidator(signUpSchema), signup);

export default router;