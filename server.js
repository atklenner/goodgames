require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

let db, gamesCollection;

MongoClient.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log(`Connected to database`);
    db = client.db("video_game_tracker");
    gamesCollection = db.collection("games");
  })
  .catch((error) => console.error(error));

app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.listen(process.env.PORT, () => console.log("server is running"));
