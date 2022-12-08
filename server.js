require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/database");
const indexRouter = require("./routes/index");
const gamesRouter = require("./routes/games");
const usersRouter = require("./routes/users");
const listsRouter = require("./routes/lists");
const reviewsRouter = require("./routes/reviews");
const commentsRouter = require("./routes/comments");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const methodOverride = require("method-override");
const helpers = require("./helpers/helpers");
const compression = require("compression");
const errorHandler = require("./middleware/errorHandler");

require("./config/passport")(passport);

connectDB();

app.set("view engine", "ejs");

app.use(cors());

app.use(compression());

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("tiny"));

app.use(methodOverride("_method"));

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

helpers(app);

app.use("/", indexRouter);
app.use("/games", gamesRouter);
app.use("/users", usersRouter);
app.use("/lists", listsRouter);
app.use("/reviews", reviewsRouter);
app.use("/comments", commentsRouter);

app.all("*", (req, res) => {
  throw new Error("Not sure what you did, don't do it again.")
});

app.use(errorHandler);

app.listen(process.env.PORT, () => console.log("server is running"));
