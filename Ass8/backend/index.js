import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

console.log("Mongo URL:", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    roll_no : {
        type : Number,
        required : true,
    }
});

const Student = mongoose.model("Student",studentSchema);

// let students = [
//     {
//         name: "Tejas",
//         roll_no: 67
//     },
//     {
//         name: "Rohit",
//         roll_no: 64
//     }
// ];

app.get("/students", async (req, res) => {
    try{
        let students = await Student.find();
        res.json(students);
    }catch(err){
        console.log("Error occured : "+err);
    }
});

app.post("/add", async (req, res) => {
    let data = req.body;
    console.log(data);
    // students.push(req.body);
    try{
        let student = await Student.create({
            name : data.name,
            roll_no : data.roll_no
        });
        res.json({
            message: "Student added successfully",
            student: student
        });
    }catch(err){
        console.log("Error : "+err);
        res.status(500).json({
            message : "Failed to add students"
        });
    }
    
})


app.listen(5173, () => {
    console.log("app is running");
});