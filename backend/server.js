const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("My backend is fine");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
