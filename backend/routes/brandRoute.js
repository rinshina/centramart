import express from 'express'
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { createBrand } from '../controllers/brandController.js';

const brandRouter=express.Router()
brandRouter.post("/", protect, adminOnly, createBrand);

export default brandRouter;