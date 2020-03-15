const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const router = require("./router");
const app = express();
app.use(router);

const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

io.on("connection", socket => {
  socket.on("join", (obj, callback) => {
    const addingUser = addUser({
      id: socket.id,
      name: obj.name,
      room: obj.room
    });

    if (addingUser.error) {
      return callback && callback(addingUser.error);
    }

    socket.emit("message", {
      user: "ADMIN",
      text:
        addingUser.user.room.trim().toLowerCase() === "dontgettoonasty"
          ? `${addingUser.user.name}, this is the secret room`
          : `${addingUser.user.name}, welcome to the room ${addingUser.user.room}`
    });

    socket.broadcast.to(addingUser.user.room).emit("message", {
      user: "ADMIN",
      text: `${addingUser.user.name} has joined`
    });

    socket.join(addingUser.user.room);

    callback && callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(user);
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "ADMIN",
        text: `${user.name} has left`
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server is now live on port ${PORT}`));
