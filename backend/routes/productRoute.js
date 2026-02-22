import express from "express"
import { createProduct,getProducts, getSingleProduct,updateProduct,deleteProduct } from "../controllers/productController.js"
import { protect,adminOnly } from "../middleware/authMiddleware.js"

const productRouter=express.Router()
productRouter.get("/", getProducts);
productRouter.get("/:id", getSingleProduct);
productRouter.post("/",protect,adminOnly,createProduct)
productRouter.put("/:id",protect,adminOnly,updateProduct)
productRouter.delete("/:id", protect, adminOnly, deleteProduct)

export default productRouter;