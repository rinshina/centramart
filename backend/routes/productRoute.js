import express from "express"
import { createProduct,getProducts } from "../controllers/productController.js"
import { protect,adminOnly } from "../middleware/authMiddleware.js"

const productRouter=express.Router()
productRouter.get("/", getProducts);
productRouter.post("/",protect,adminOnly,createProduct)

export default productRouter;