import jwt from "jsonwebtoken"

export const protect=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    //if no authorization token
    if(!authHeader){
        return res.status(401).json({message:"No token provided"})
    }
    if(!authHeader.startsWith("Bearer "))
        return res.status(401).json({message:"Invalid token"})


    const token=authHeader.split(" ")[1]
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    } catch (error) {
        return res.status(401).json({message:"Invalid token or expired"})
    }
}

export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  //return res.status(200).json({message:"it works"})

  next();
};

