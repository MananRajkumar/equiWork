import { Request, Response } from "express";
import { Application } from "../models/applicationModel";
import { ApplicationStatus, PostStatus } from "../schemas/utilSchema";
import { Post } from "../models/postModel";


export const applyPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postID } = req.params;

        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { id } = req.user;
        const { description } = req.body;

        const application = await Application.create({
            postId: postID,
            applicant: id,
            description: description || "",
            status: ApplicationStatus.Pending
        });

        res.json({
            message: "Applied to post successfully!!!",
            application,
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const { applicationId } = req.params;

        const application = await Application.findById(applicationId);


        res.json({
            message: "Fetched application successfully!!!",
            application,
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const getApplicationsForPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postID } = req.params;

        const applications= await Application.find({ postId: postID });


        res.json({
            message: "Fetched applications successfully!!!",
            applications: applications
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const updateApplicationStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        const application = await Application.findById(applicationId);

        if(!application) {
            res.json({
                message: "Application not found!!!"
            });
            return;
        }

        const updatedApplication = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });

        const post = await Post.findById(application.postId);

        if(status === ApplicationStatus.Accepted && post) {
            post.status = PostStatus.closed;
        }

        res.json({
            message: "Application Status updated successfully!!!",
            application: updatedApplication
        });

    } catch (error) {
        res.status(500).json({
            message: "An Error occurred",
            error: error instanceof Error ? error.message : error,
        });
    }
};