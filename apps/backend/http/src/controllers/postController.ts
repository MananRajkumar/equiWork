import { Request, Response } from "express";
import { Post } from "../models/postModel";



export const getAllUserPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.user;
        const posts = await Post.find({ createdBy: id });

        res.json({
            message: "Posts fetched successfully!!!",
            posts: posts
        });

    } catch (error) {
        res.json({
            message: "An Error occured",
            error: error
        });
    }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postID } = req.params;
        const post = await Post.findById(postID);
        res.json({
            message: "Fetched post successfully!",
            post: post
        });

    } catch (error) {
        res.json({
            message: "An Error occured",
            error: error
        });
    }
};

export const makePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.user;
        const { title, description, skillsRequired, status } = req.body;

        const post = await Post.create({
            title: title,
            description: description,
            createdBy: id,
            skillsRequired: skillsRequired || [],
            status: status || "open"
        });
          
        res.json({
            message: "Added Post successfully!!!",
            post: post
        });

    } catch (error) {
        res.json({
            message: "An Error occured",
            error: error
        });
    }
};

export const editPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const editedPost = await Post.findByIdAndUpdate({ id }, req.body, { new: true });  

        res.json({
            message: "Edited Post successfully!!!",
            post: editedPost
        });

    } catch (error) {
        res.json({
            message: "An Error occured",
            error: error
        });
    }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postID } = req.params;
        const deletedPost = await Post.findByIdAndDelete(postID);  
        
        res.json({
            message: "Deleted Post successfully!!!",
            post: deletedPost
        });

    } catch (error) {
        res.json({
            message: "An Error occured",
            error: error
        });
    }
};
