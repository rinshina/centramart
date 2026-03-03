import express from 'express'
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { createBrand , getBrands} from '../controllers/brandController.js';

const brandRouter=express.Router()
brandRouter.post("/", protect, adminOnly, createBrand);
brandRouter.post("/brand", getBrands);


export default brandRouter;