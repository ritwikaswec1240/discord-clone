const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve a basic homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg); // send to everyone
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start server
server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
