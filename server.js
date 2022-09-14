require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen(process.env.PORT, () => console.log("server is running"));
