const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  var clientIp = socket.conn.remoteAddress;
  console.log(`User Connected: ${clientIp}`);

  socket.on("send_img", (data) => {
    socket.broadcast.emit("recive_img", data);
  });
  socket.on("send_accpect", (data) => {
    socket.broadcast.emit("recive_accpect", data);
  });
  socket.on("send_cancel", (data) => {
    socket.broadcast.emit("recive_cancel", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
