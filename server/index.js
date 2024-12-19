const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
// Middleware
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(`Message received: ${data}`);
    io.brodcast("receive_message", data); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// API Routes
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from Node.js!" });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
