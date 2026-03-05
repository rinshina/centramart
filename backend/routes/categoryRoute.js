import express from "express";
import { createCategory ,getCategories} from "../controllers/categoryController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/", protect, adminOnly, createCategory);
categoryRouter.get("/", getCategories);


export default categoryRouter;
