import express from "express";
import { createCategory ,getCategories} from "../controllers/categoryController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/", protect, adminOnly, createCategory);
categoryRouter.post("/category", getCategories);


export default categoryRouter;
