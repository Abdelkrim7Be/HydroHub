const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utilities/db");
const socket = require("socket.io");
const http = require("http");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

let allSellers = [];
let admin = {};

const addSeller = (sellerId, socketId, userInfo) => {
  const checkSeller = allSellers.some((a) => a.sellerId === sellerId);
  if (!checkSeller) {
    allSellers.push({
      sellerId,
      socketId,
      userInfo,
    });
  }
};

const findSeller = (sellerId) => {
  return allSellers.find((a) => a.sellerId === sellerId);
};

const remove = (socketId) => {
  allSellers = allSellers.filter((a) => a.socketId !== socketId);
};
io.on("connection", (socket) => {
  console.log("Socket server running...");
  console.log("A user connected:", socket.id);

  socket.on("add_seller", (sellerId, userInfo) => {
    addSeller(sellerId, socket.id, userInfo);
    io.emit("activeSeller", allSellers);
  });
  socket.on("add_admin", (adminInfo) => {
    delete adminInfo.email;
    delete adminInfo.password;
    admin = adminInfo;
    // console.log(admin);
    admin.socketId = socket.id;
    io.emit("activeSeller", allSellers);
  });

  // Listening for messages from seller
  socket.on("send_message_seller_to_admin", (msg) => {
    if (admin.socketId) {
      socket.to(admin.socketId).emit("received_seller_message", msg);
    }
  });

  // Listening for messages from admin
  socket.on("send_message_admin_to_seller", (msg) => {
    const seller = findSeller(msg.receiverId);
    if (seller !== undefined) {
      socket.to(seller.socketId).emit("received_admin_message", msg);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    remove(socket.id);
    io.emit("activeSeller", allSellers);
  });
});

// to prevent the req.body from being undefined
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/dashboards/categoryRoutes"));
app.use("/api", require("./routes/dashboards/productRoutes"));
app.use("/api", require("./routes/dashboards/sellerRoutes"));
app.use("/api", require("./routes/dashboards/chatRoutes"));
app.use("/api", require("./routes/paymentRoutes"));

app.get("/", (req, res) => {
  res.send("My backend is fine");
});

dbConnect();

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
