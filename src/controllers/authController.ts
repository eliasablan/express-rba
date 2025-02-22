import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { type IUser } from "../models/userModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body as IUser;
    const hasehdPassword = await Bun.password.hash(password);

    const newUser = new User({ username, password: hasehdPassword, role });
    console.log({ newUser });
    await newUser.save();
    res
      .status(201)
      .json({ message: `User registered with username ${username}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as IUser;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with username ${username} not found` });
    }

    const passwordsMatch = await Bun.password.verify(password, user.password);
    if (!passwordsMatch) {
      return res.status(400).json({ message: `Invalid credentials` });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      Bun.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
