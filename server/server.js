const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./db/connectDB");
const AuthRouter = require('./Routes/AuthRouter');
const http = require('http'); // module added to create an HTTP server that both Express and WebSocket can use.
//const setupWebSocket = require('./websocket'); // Importing the setupWebSocket function from the websocket.js file.
const WebSocket = require('ws');

// loading in the environment variables 
dotenv.config()

const app = express();
const corsOptions = { 
    origin: ("http://localhost:5173"),
};

const server = http.createServer(app); // creating an HTTP server using http.createServer(app).
//const wss = setupWebSocket(server);// Set up WebSocket
const wss = new WebSocket.Server({ port: 8080 });

let clients = {};

wss.on('connection', (ws, req) => {
  const userID = req.url.split('userID=')[1];
  clients[userID] = ws;

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    const { to, from, content } = message;

    // Route the message to the intended recipient
    if (clients[to]) {
      clients[to].send(JSON.stringify({ from, content, timestamp: new Date() }));
    } else {
      ws.send(JSON.stringify({ error: 'User is not connected' }));
    }
  });

  ws.on('close', () => {
    delete clients[userID];
  });
});

console.log("WebSocket server running on ws://localhost:8080");
// Websocket integration 

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/auth', AuthRouter);

app.get("/api", (req,res) => {
});

app.listen(8080, () => {
    connectDB();
    console.log("server started on port 8080");
});