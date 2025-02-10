import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ZodSchema } from "zod";
import { Role } from "../schemas/utilSchema";

const JWT_SECRET: string = process.env.JWT_SECRET || "myjwtsecret";

export const inputValidator = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.json({
        errors: result.error.errors,
      });
      return;
    }
    next();
  };
};

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1];


        if(!token) {
            return res.status(401).json({
                message: "Unauthorized Access: No Token Provided!!!"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: Role; };

        req.user = decoded;
        console.log(decoded);
        next();
    }
    catch(error) {
        return res.status(401).json({
            message: "Unauthorized Access: Invalid Token"
        });
    }
};

export const validateRole = (...authorizeRoles: Array<Role>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!authorizeRoles.includes(req.user.role)) {
      res.json({
        message: "Access Denied! You don't have permission.",
      });
      return;
    }
    next();
  };
};
