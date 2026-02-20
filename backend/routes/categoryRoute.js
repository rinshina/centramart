import express from "express";
import { createCategory } from "../controllers/categoryController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/", protect, adminOnly, createCategory);

export default categoryRouter;
