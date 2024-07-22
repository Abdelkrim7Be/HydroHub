const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// to prevent that the req.body being undefined
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("My backend is fine");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
