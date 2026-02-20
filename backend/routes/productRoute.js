import express from "express"
import { createProduct } from "../controllers/productController.js"
import { protect,adminOnly } from "../middleware/authMiddleware.js"

const productRouter=express.Router()
productRouter.post("/",protect,adminOnly,createProduct)

export default productRouter;