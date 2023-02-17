import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);
let dailyWtf = 0;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use("/favicon.ico", express.static("favicon.ico"));

io.on("connection", (socket) => {
  io.emit("dailyWtf", dailyWtf);
  socket.on("wtf", (msg) => {
    dailyWtf++;
    io.emit("wtf", msg);
  });
  socket.on("mouse", (msg) => {
    const { x, y } = msg;

    dailyWtf++;
    io.emit("paint", { x, y });
  });
});

app.set("port", process.env.PORT || 4000);
server.listen(app.get("port"), () => {
  console.log(
    `Socket.IO server running at http://localhost:${app.get("port")}/`
  );
});
