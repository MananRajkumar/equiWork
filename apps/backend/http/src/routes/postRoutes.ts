import { Router } from "express";
import { deletePost, editPost, getAllUserPosts, getPost, makePost } from "../controllers/postController";

const router = Router();

router.get('/get-all-user-posts', getAllUserPosts);

router.get('/get-post/:postID', getPost);

router.post('/make-post', makePost);

router.patch('/edit-post/:postID', editPost);

router.delete('/delete-post/:postID', deletePost);

export default router;