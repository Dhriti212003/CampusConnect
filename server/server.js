const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const eventRoutes = require("./routes/eventRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/events", eventRoutes);

connectDB();

app.get("/api/health",(req,res)=>{
    res.json({
        message:"CampusConnect API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});