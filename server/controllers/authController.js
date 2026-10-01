
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req,res,next) => {
    try{
        
        const {
            name,
            email,
            password,
            college,
            branch,
            graduationYear,
            skills,
            interests
        }=req.body;
        
        if(!name || !email || !password){
        res.status(400).json({
            success:false,
            message:"Name,email and password is required"
        });

        }
        const exisitingUser = await User.findOne({email});

        if(exisitingUser){
            return res.status(409).json({
                success:false,
                message:"User already exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            college,
            branch,
            graduationYear,
            skills,
            interests
        });

        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    }
    catch(error){
        next(error);
    }
};

const loginUser = async (req,res,next) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and password is required"
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invaild email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(401).json({
                success:false,
                message:"Invaild email or password"
            });
        }
        
        const token = jwt.sign(
            {
            id:user._id,
            role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );

        res.status(200).json({
            success:true,
            message:"Login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });

    } catch(error){
        next(error);
    }
};

module.exports = {
    registerUser,loginUser
}