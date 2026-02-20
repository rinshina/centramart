import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'
import { adminOnly, protect } from '../middleware/authMiddleware.js'

const userRouter= express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/test', protect,(req, res) => {
  res.json({ message: "Protected route", user: req.user });
})
userRouter.get('/adminonlytest', protect,adminOnly,(req, res) => {
  res.json({ message: "Protected route", user: req.user });
})




export default userRouter