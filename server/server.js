const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./db/connectDB");
const AuthRouter = require('./routes/AuthRouter');
const ItemRouter = require('./routes/ItemRouter');

// loading in the environment variables 
dotenv.config()

const app = express();
const corsOptions = { 
    origin: ("http://localhost:5173"),
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/auth', AuthRouter);
app.use('/items', ItemRouter);

app.get("/api", (req,res) => {
    console.log(req)
    res.sendStatus(200);
});

app.listen(8080, () => {
    connectDB();
    console.log("server started on port 8080");
});