import { Router } from "express";
import { login, signup, getAllUsers, deleteAllUsers } from "../controllers/authController";
import { inputValidator } from "../utils/middlewares";
import { userAuthSchema } from "../schemas/userAuthSchema";


const router = Router();

router.delete('/delete-all-users', deleteAllUsers);
router.get("/get-all-users", getAllUsers);
router.post('/login', inputValidator(userAuthSchema), login);
router.post('/signup', inputValidator(userAuthSchema), signup);

export default router;