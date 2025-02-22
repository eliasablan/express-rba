import express, { type RequestHandler } from "express";
import verifyToken from "../middlewares/authMiddleware";

const router = express.Router();

// Only admin can access this routes
router.get("/admin", verifyToken as RequestHandler, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// Only admin and managers can access this routes
router.get("/manager", verifyToken as RequestHandler, (req, res) => {
  res.json({ message: "Welcome Manager" });
});

// All roles access this routes
router.get("/user", verifyToken as RequestHandler, (req, res) => {
  res.json({ message: "Welcome User" });
});

export default router;
