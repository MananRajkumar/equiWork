import { Router } from "express";
import { deleteMessage, getAllChats, getParticularChat, sendMessage } from "../controllers/chatController";

const router = Router();

router.get('/get-all-chats', getAllChats);

router.get('/get-particular-chat/:chatId', getParticularChat);

router.post('/:chatId/send-message', sendMessage);

router.delete('/:messageId', deleteMessage);

export default router;