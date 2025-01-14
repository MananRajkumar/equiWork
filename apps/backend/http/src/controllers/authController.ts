import { Request, Response } from "express";
import { UserAuth } from "../models/userModel";
import { compare, genSalt, hash } from "bcrypt";

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
        
        res.json({
            message: "Login Successful!!!",
            user: userExists
        });
    } catch (error) {
        res.json({
            message: "An Error occured",
            error: error
        });
    }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const userExists = await UserAuth.findOne({ email });

        if (userExists) {
            res.json({
                message: "A User already exists with the specified email",
            });
            return;
        }

        const salt = await genSalt(13);
        const hashedPassword = await hash(password, salt);

        const user = new UserAuth({
            email: email,
            password: hashedPassword
        });

        await user.save();

        res.json({
            message: "User created successfully with the given credentials!!!",
            user: user
        });
    } catch (error) {
        res.json({
            message: "An error occured!!!",
            error: error,
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
        res.json({
            message: "An error occured!!!",
            error: error,
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
        res.json({
            message: "An error occured!!!",
            error: error,
        });
    }
};

