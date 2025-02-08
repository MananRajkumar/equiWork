import { Request, Response } from "express";
import { UserAuth } from "../models/userAuthModel";
import { compare, genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";

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
        res.json({
            message: "An Error occured",
            error: error
        });
    }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, role } = req.body;

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
            password: hashedPassword,
            role: role
        });

        await user.save();

        const data = { _id: user._id, role: role };
        const token = jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        

        res.json({
            message: "User created successfully with the given credentials!!!",
            user: user,
            token
        });
    } catch (error) {
        console.log(error);
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

