import { Request, Response } from "express";
import { UserAuth } from "../models/userAuthModel";
import { compare, genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { UserProfile } from "../models/userProfileModel";

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const userExists = await UserAuth.findOne({ email });

        if(!userExists) {
            res.json({
                message: "No user exists with this email!!!",
            })
            return;
        }

        const result = await compare(password, userExists.password);

        if(!result){
            res.json({
                message: "Wrong Password"
            })
            return;
        }

        const data = { _id: userExists._id, role: userExists.role };
        const token = jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        
        res.json({
            message: "Login Successful!!!",
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, fullName, password, role } = req.body;

        const userExists = await UserAuth.findOne({ email });

        if (userExists) {
            res.json({
                message: "A User already exists with the specified email",
            });
            return;
        }

        const salt = await genSalt(13);
        const hashedPassword = await hash(password, salt);


        const userAuth = await UserAuth.create({
            email: email,
            password: hashedPassword,
            role: role
        });

        const userProfile = await UserProfile.create({
            userId: userAuth._id,
            fullName: fullName
        });

        const data = { id: userAuth._id, role: role };
        const token = jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        

        res.json({
            message: "User created successfully with the given credentials!!!",
            userAuth: userAuth,
            userProfile: userProfile,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserAuth.find();
        
        res.json({
            message: "Fetched all users successfully",
            users: users
        });
    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const deleteAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserAuth.deleteMany();
        
        res.json({
            message: "Deleted all users successfully",
            users: users
        });
    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await UserAuth.findOne( { email });

        if(!user){
            res.json({
                message: "No such user exists with the given email"
            });
            return;
        }

        const checkPassword = await compare(password, user.password);

        if(!checkPassword){
            res.json({
                message: "Incorrect password!!!"
            });
            return;
        }

        const deletedUserAuth = await UserAuth.findByIdAndDelete(user._id);
        const deletedUserProfile = await UserProfile.findOneAndDelete( { userId: user._id });

        res.json({
            message: "Fetched all user chats successfully!!!",
            deletedUserAuth,
            deletedUserProfile
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};
