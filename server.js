require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_STRING, () => {
  console.log("connected to DB");
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT, () => console.log("server is running"));
