import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import brandRouter from './routes/brandRoute.js'
import categoryRouter from './routes/categoryRoute.js'
import productRouter from './routes/productRoute.js'
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//App Config
const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
//api routes
app.use('/api/user',userRouter)
app.use('/api/brand', brandRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.get('/',(req,res)=>{
    res.send("API working")
})


app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
})