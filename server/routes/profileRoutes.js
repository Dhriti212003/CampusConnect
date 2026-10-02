const express = require("express");
const protect = require("../middleware/authMiddleware");
const { getProfile,updateProfile } = require("../controllers/profileController");
const authorize = require("../middleware/authorizeMiddleware");

const router = express.Router();

router.get("/", protect, getProfile);

router.put("/", protect, updateProfile);



module.exports = router;