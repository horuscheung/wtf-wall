const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 4000;
let dailyWtf = 0;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

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

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
