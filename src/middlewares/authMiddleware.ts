import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token;
  let authHeader = (req.headers.Authorization ||
    req.headers.authorization) as string;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied." });
    }

    try {
      const decode = jwt.verify(token, Bun.env.JWT_SECRET!);
      // @ts-expect-error
      req.user = decode;
      // @ts-expect-error
      console.log("The decoded user is: ", req.user);
      next();
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Token is not valid" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied." });
  }
};

export default verifyToken;
