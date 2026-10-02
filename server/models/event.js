const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    organizer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    date:{
        type:Date,
        required:true
    },
        location:{
            type:String,
            required:true,
            trim:true
        },
        category:{
            type:String,
        required:true,
        trim:true

        },
        registrationDeadline:{
            type:Date,
        },
        capacity:{
            type: Number,
            min: 1
        }
    
},
{
    timestamps: true
}
);

const Event = mongoose.model("Event",eventSchema);
module.exports = Event;