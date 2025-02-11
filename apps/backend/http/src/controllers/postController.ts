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
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postID } = req.query;
        const post = await Post.findById(postID);
        res.json({
            message: "Fetched post successfully!",
            post: post
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
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
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const editPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.query;
        const editedPost = await Post.findByIdAndUpdate({ id }, req.body, { new: true });  

        res.json({
            message: "Edited Post successfully!!!",
            post: editedPost
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postID } = req.query;
        const deletedPost = await Post.findByIdAndDelete(postID);  
        
        res.json({
            message: "Deleted Post successfully!!!",
            post: deletedPost
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};
