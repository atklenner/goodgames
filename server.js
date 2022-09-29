require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const database = require("./config/database");
const indexRouter = require("./routes/index");
const gamesRouter = require("./routes/games");

database();

app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/", indexRouter);
app.use("/games", gamesRouter);

app.listen(process.env.PORT, () => console.log("server is running"));
