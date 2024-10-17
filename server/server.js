const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./db/connectDB");
const AuthRouter = require('./Routes/AuthRouter');



// loading in the environment variables 
dotenv.config()

const app = express();
const corsOptions = { 
    origin: ("http://localhost:5173"),
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/auth', AuthRouter);

app.get("/api", (req,res) => {
});

app.listen(8080, () => {
    connectDB();
    console.log("server started on port 8080");
});