import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });



const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }

});

const User = mongoose.model("User", userSchema);



const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    roll_no: {
        type: Number,
        required: true
    }

});

const Student = mongoose.model("Student", studentSchema);

app.get("/test", (req, res) => {
    res.json({
        message: "Test successful"
    });
});

app.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful",
            token: token
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// JWT MIDDLEWARE
function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

}

app.get("/students", authMiddleware, async (req, res) => {

    try {

        const students = await Student.find();

        res.json(students);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch students"
        });

    }

});


app.post("/add", authMiddleware, async (req, res) => {

    try {

        const student = await Student.create({
            name: req.body.name,
            roll_no: req.body.roll_no
        });

        res.json({
            message: "Student added successfully",
            student: student
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to add student"
        });

    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});