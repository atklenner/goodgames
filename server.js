require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

mongoose.connect(process.env.DB_STRING, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("connected to DB");
});

app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.listen(process.env.PORT, () => console.log("server is running"));
