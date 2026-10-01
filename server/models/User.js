const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim: true
        },
        email:{
            type:String,
            required: true,
            unique:true,
            lowercase:true,
            trim: true
        },
        password:{
            type:String,
            required: true,
        },
        college:{
            type:String,
            trim: true
        },
        branch:{
            type:String,
            trim: true
        },
        graduationYear:{
            type:Number
        },
        skills:{
            type:[String],
            default:[]
        },
        interests:{
            type:[String],
            default:[]
        },
        github: {
            type: String,
            trim: true
        },
        
        linkedin: {
            type: String,
            trim: true
        },
        role:{
            type:String,
            enum:["student","organizer","admin"],
            default:"student"
        },
        
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User",userSchema);
module.exports = User;