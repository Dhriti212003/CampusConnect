const express = require("express");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorizeMiddleware");

const {
    createEvent, getAllEvents, getOneEvent, updateEvent, deleteEvent
} = require("../controllers/eventController");

const router = express.Router();

router.post(
    "/",
    protect,
    authorize("organizer", "admin"),
    createEvent
);
router.get("/", getAllEvents);

router.get("/:id", getOneEvent);

router.put(
    "/:id",
    protect,
    authorize("organizer", "admin"),
    updateEvent
);

router.delete(
    "/:id",
    protect,
    authorize("organizer", "admin"),
    deleteEvent
);


module.exports = router;