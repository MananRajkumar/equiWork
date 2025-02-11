import { Router } from "express";
import { deletePost, editPost, getAllUserPosts, getPost, makePost } from "../controllers/postController";

const router = Router();

router.get('/get-all-user-posts', getAllUserPosts);

router.get('/get-post', getPost);

router.post('/make-post', makePost);

router.patch('/edit-post', editPost);

router.delete('/delete-post', deletePost);

export default router;