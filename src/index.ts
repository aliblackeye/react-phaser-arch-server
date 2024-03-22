import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";
import socket from "./sockets/socket";

import { createServer } from "http";

const app = express();
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Event Handlers
socket(io);

app.use(cors());
app.use(bodyParser.json());

app.use("/", router());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running!",
  });
});

server.listen(5000, async () => {
  console.log("Server running on 5000 port.");
});

/* CTRL + C YAPILDIĞINDA TETİKLENİR */
process.on("SIGINT", async () => {
  console.log("Server shutting down...");
  process.exit();
});
