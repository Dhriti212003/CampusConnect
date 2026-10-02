const User = require("../models/User");

const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                branch: user.branch,
                graduationYear: user.graduationYear,
                skills: user.skills,
                interests: user.interests,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req,res,next) =>{
    try{

        const {
            name,
            email,
            college,
            branch,
            graduationYear,
            skills,
            interests,
            github,
            linkedin,
            role
        } = req.body;

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        user.name = name ?? user.name;
        user.college = college ?? user.college;
        user.branch = branch ?? user.branch;
        user.graduationYear = graduationYear ?? user.graduationYear;
        user.skills = skills ?? user.skills;
        user.interests = interests ?? user.interests;
        user.github = github ?? user.github;
        user.linkedin = linkedin ?? user.linkedin;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                branch: user.branch,
                graduationYear: user.graduationYear,
                skills: user.skills,
                interests: user.interests,
                github: user.github,
                linkedin: user.linkedin,
                role: user.role
            }
        });

    } catch(error){
        next(error);
    }
};

module.exports = {
    getProfile,updateProfile
};