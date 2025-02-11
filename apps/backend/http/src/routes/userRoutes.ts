import { Router } from "express";
import { editUser, getUser } from "../controllers/userController";

const router = Router();

router.get('/', getUser);

router.patch('/edit-user', editUser);


export default router;