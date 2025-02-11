import { Request, Response } from "express";
import { Chat } from "../models/chatModel";
import { Schema } from "mongoose";
import { Message } from "../models/messageModel";


export const getAllChats = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.user;
        const chats = await Chat.find({ participants: id });

        res.json({
            message: "Fetched all user chats successfully!!!",
            chats: chats
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getParticularChat = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.user;
        const { chatId } = req.params;

        
        const chat = await Chat.findById(chatId);

        if(!chat){
            res.json({
                message: "Chat does not exits"
            });
            return;
        }

        if(!chat?.participants.includes(id as unknown as Schema.Types.ObjectId)){
            res.json({
                message: "User not authorized to view chat!!!"
            });
            return;
        }

        res.json({
            message: "Fetched applications successfully!!!",
            chat: chat
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.user;
        const { chatId } = req.params;
        const { content } = req.body;
        
        const chat = await Chat.findById(chatId);

        if(!chat){
            res.json({
                message: "Chat does not exits!!!"
            });
            return;
        }

        if(!chat?.participants.includes(id as unknown as Schema.Types.ObjectId)){
            res.json({
                message: "User not authorized to send message in the particular chat!!!"
            });
            return;
        }

        const message = await Message.create({
            chatId: chatId,
            sender: id,
            content: content
        });

        res.json({
            message: "Message send successfully!!!",
            sentMessage: message
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.user;
        const { messageId } = req.params;
        
        const foundMessage = await Message.findById(messageId);

        if(!foundMessage){
            res.json({
                message: "Message does not exits!!!"
            });
            return;
        }

        if(foundMessage.sender !== (id as unknown as Schema.Types.ObjectId)){
            res.json({
                message: "Not authorized to delete the message"
            });
            return;
        }

        const deletedMessage = await Message.findByIdAndDelete(messageId);

        res.json({
            message: "Message send successfully!!!",
            deletedMessage: deletedMessage
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};