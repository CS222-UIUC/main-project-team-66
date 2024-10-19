const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const AuthRouter = require("./Routes/AuthRouter");


// loading in the environment variables 
dotenv.config()

const app = express();
const corsOptions = { 
    origin: ("http://localhost:5173"),
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/auth', AuthRouter);

module.exports = app;
