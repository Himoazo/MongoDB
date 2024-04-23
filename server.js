const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 3000;

//Connect to MongoDB
mongoose.connect(process.env.uri).then(()=>{
    console.log("Kopplat till MongoDB Atlas");
}).catch((error)=>{
    console.log("Det gick inte att koppla till db " + error);
});


//Schema
const expSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Organisation måste fyllas i"]
    },
    jobtitle: {
        type: String,
        required: [true, "Jobbtitel måste fyllas i"]
    },
    location: {
        type: String,
        required: [true, "Plats måste vara ifylld"]
    },
    startdate: {
        type: Date,
        required: [true, "Startdatym måste anges"]
    },
    enddate: {
        type: Date,
        required: false
    }  
});

const workexperience = mongoose.model("workexperience", expSchema);

//Hantera GET requests
app.get("/workexperiences", async(req, res)=>{
    try{
        let result = await workexperience.find({});
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});

//Hantera POST requests
app.post("/workexperiences", async(req, res)=>{
    try{
        let result = await workexperience.create(req.body);

        return res.json(result);
    }catch(error){
        return res.status(400).json(error);
    }
});

//Hantera DELETE requests
app.delete("/workexperiences/:id", async(req, res)=>{
    let id = req.params.id;

    try{
        let result = await workexperience.deleteOne({_id: id});
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});

//Hantera PUT requests
app.put("/workexperiences/:id", async(req, res)=>{
    let id = req.params.id;
    let exp = req.body;

    try{
        let result = await workexperience.updateOne({_id: id}, {$set: exp});
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});

//Startar server
app.listen(port, ()=>{
    console.log("kopplat till server på port: " + port);
});