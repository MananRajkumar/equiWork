import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ZodSchema } from "zod";

export const inputValidator = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);

        if(!result.success){
            res.status(400)
                      .json({
                        errors: result.error.errors
                      });
            return;
        }

        next();
    }
}