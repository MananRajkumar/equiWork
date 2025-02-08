import { Request, Response } from "express";
import { UserProfile } from "../models/userAuthModel";
import { CustomRequest } from "../utils/middlewares";

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.query;

        const user = await UserProfile.findOne({ userId: userId });

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
        const { userId } = (req as CustomRequest).user;

    } catch (error) {
        res.json({
            message: "An Error occured",
            error: error
        });
    }
};