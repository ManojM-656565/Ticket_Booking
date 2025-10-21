const jwt=require('jsonwebtoken')
const User=require('../models/User.js')

module.exports=async function (req,res,next){
    // let token=null;

    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startWith('Bearer ')){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }

    const token=authHeader.split(' ')[1];

    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        const user =await User.findById(payload.id).select('-password')
        if(!user){
            return res.status(401).json({
                message:'Uauthorized'
            })
        }
        req.user=user;
        next();
    }
    catch(err){
        return res.status(401).json({
            message:'Invalid token'
        })
    }
}