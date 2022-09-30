require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/database");
const indexRouter = require("./routes/index");
const profileRouter = require("./routes/profile");
const gamesRouter = require("./routes/games");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");

require("./config/passport")(passport);

connectDB();

app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(
  session({
    secret: "my very good secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create(mongoose.connection),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", indexRouter);
app.use("/profile", profileRouter);
app.use("/games", gamesRouter);

app.listen(process.env.PORT, () => console.log("server is running"));
