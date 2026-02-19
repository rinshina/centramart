import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// User register function
export const registerUser=async(req,res)=>{
    try {
        const {name,email,password,phone}=req.body
        // checks if user exist
        const existingUser=await User.findOne({email})
        if(existingUser)
            return res.status(400).json({message:"User already exists"})

        //checks if all required fields are present
        if (!name || !email || !password) {
          return res.status(400).json({ message: "All fields are required" });
        }

        //checls if password length >=8
        if (password.length < 8) {
          return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        // hash the password
        const salt=await bcrypt.genSalt(8);
        const hashedPassword=await bcrypt.hash(password,salt)

        // now create the user
        const user=await User.create({
            name,email,password:hashedPassword,phone,
        })
        //generate token
        const token=generateToken(user)
        

        // sends response if success
        res.status(201).json({success:true,token});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//User Login Function
export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        // check if user exist
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }

        // compare match
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

        //generate token
        const token=generateToken(user)
        res.status(200).json({success:true,token});

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}