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
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const editUser = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const { id } = req.user;

        const updateData = { ... req.body };

        if (("selectedJobs" in updateData || "userId" in updateData || "applications" in updateData) && req.user.role !== "admin") {
            res.json({
                message: "You are not allowed to modify selectedJobs or userId or applications"
            });
            return;
        }

        const editedUser = await UserProfile.findOneAndUpdate({ userId: id }, updateData, { new: true });

        res.json({
            message: "Edited user successfully!",
            user: editedUser
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};