import { Request, Response } from "express";
import { UserProfile } from "../models/userProfileModel";



export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.user;

        const user = await UserProfile.findOne({ userId: id });

        if(!user){
            res.status(404).json({
                message: "User not found!"
            })
            return;
        }

        res.json({
            message: "Fetched the user successfully!!!",
            user: user
        });
    } catch (error) {
        res.json({
            message: "An Error occured",
            error: error
        });
    }
};

export const editUser = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized: No user found" });
            return;
        }
        
        const { id } = req.user;

        const editedUser = await UserProfile.findOneAndUpdate({ userId: id }, req.body, { new: true });

        res.json({
            message: "Edited user successfully!",
            user: editedUser
        });

    } catch (error) {
        res.json({
            message: "An Error occured",
            error: error
        });
    }
};