const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./db/connectDB");


// loading in the environment variables 
dotenv.config()

const app = express();
const corsOptions = { 
    origin: ("http://localhost:5173"),
};

app.use(cors(corsOptions));

app.get("/api", (req,res) => {
    res.json({"dummy_data" : ["one", "two", "three"]});
});

app.listen(8080, () => {
    connectDB();
    console.log("server started on port 8080");
});