// const express = require("express");
// const path = require("path");

// const app = express();
// const server = require("http").createServer(app);

// const io = require("socket.io")(server);

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname+"/public")));

// io.on("connection",function(socket){
//     socket.on("newuser",function(username){
//         socket.broadcast.emit("update",username + " joined the conversation");
//     });
//     socket.on("exituser",function(username){
//         socket.broadcast.emit("update",username + " left the conversation");
//     });
//     socket.on("chat",function(message){
//         socket.broadcast.emit("chat",message);
//     });
// });

// app.get("/home", (req, res) => {
//     res.render("index.ejs");
// });
// server.listen(5000);

const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    socket.on("newuser", function (username) {
        socket.broadcast.emit("update", username + " joined the conversation");
    });
    socket.on("exituser", function (username) {
        socket.broadcast.emit("update", username + " left the conversation");
    });
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat", message);
    });
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

server.listen(5001, () => {
    console.log('Server is running on port 5001');
});
