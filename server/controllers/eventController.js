const Event = require("../models/event");

const createEvent = async (req, res, next) => {
    try {
        const {
            title,
            description,
            date,
            location,
            category,
            registrationDeadline,
            capacity
        } = req.body;

        if (!title || !description || !date || !location || !category) {
            return res.status(400).json({
                success: false,
                message: "Required event fields are missing"
            });
        }

        const event = await Event.create({
            title,
            description,
            organizer: req.user.id,
            date,
            location,
            category,
            registrationDeadline,
            capacity
        });

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event
        });
    } catch (error) {
        next(error);
    }
};

const getAllEvents = async (req,res,next)=>{
    try{
        const events = await Event.find()
            .populate("organizer", "name email")
            .sort({ date: 1 });

        res.status(200).json({
            success: true,
            count: events.length,
            events
        });
    } catch(error){
        next(error);
    }
};

const getOneEvent = async (req,res,next)=>{
    try{
        const event = await Event.findById(req.params.id)
            .populate("organizer", "name email");
            
            if(!event){
                return res.status(404).json({
                    success:false,
                    message:"Event not found"
                });
            }
           

        res.status(200).json({
            success: true,
            event
        });
    } catch(error){
        next(error);
    }
};


const updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        if (
            event.organizer.toString() !== req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own events"
            });
        }

        const {
            title,
            description,
            date,
            location,
            category,
            registrationDeadline,
            capacity
        } = req.body;

        event.title = title ?? event.title;
        event.description = description ?? event.description;
        event.date = date ?? event.date;
        event.location = location ?? event.location;
        event.category = category ?? event.category;
        event.registrationDeadline =
            registrationDeadline ?? event.registrationDeadline;
        event.capacity = capacity ?? event.capacity;

        await event.save();

        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            event
        });
    } catch (error) {
        next(error);
    }
};

const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        if (
            event.organizer.toString() !== req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own events"
            });
        }

        await event.deleteOne();

        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createEvent, getAllEvents, getOneEvent, updateEvent,
    deleteEvent
};