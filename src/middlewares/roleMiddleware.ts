import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../models/userModel";

const authorizedRoles = (...allowedRoles: string[]) => {
  return (
    req: Request & { user: IUser },
    res: Response,
    next: NextFunction
  ) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export default authorizedRoles;
