import express, { type RequestHandler } from "express";
import verifyToken from "../middlewares/authMiddleware";
import authorizedRoles from "../middlewares/roleMiddleware";

const router = express.Router();

// Only admin can access this routes
router.get(
  "/admin",
  verifyToken as RequestHandler,
  authorizedRoles("admin") as RequestHandler,
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

// Only admin and managers can access this routes
router.get(
  "/manager",
  verifyToken as RequestHandler,
  authorizedRoles("admin", "manager") as RequestHandler,
  (req, res) => {
    res.json({ message: "Welcome Manager" });
  }
);

// All roles access this routes
router.get(
  "/user",
  verifyToken as RequestHandler,
  authorizedRoles("admin", "manager", "user") as RequestHandler,
  (req, res) => {
    res.json({ message: "Welcome User" });
  }
);

export default router;
