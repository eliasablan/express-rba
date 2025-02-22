import express, { type Express } from "express";
import dbConnect from "./config/dbConnect";
import authRoutes from "./routes/authRoutes";

dbConnect();

const app: Express = express();
const port = Bun.env.PORT || 7002;

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
