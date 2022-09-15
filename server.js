require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
// const MongoClient = require("mongodb").MongoClient;

// let db;

// MongoClient.connect(process.env.DB_STRING, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then((err, client) => {
//   if (err) return console.err(err);
//   console.log(`Connected to database`);
//   db = client.db("video_games");
// });

let games = [
  { id: 0, name: "Borderlands", genre: "FPS", completed: true, rating: 4 },
  { id: 1, name: "Cuphead", genre: "Platformer", completed: false },
  {
    id: 2,
    name: "Stardew Valley",
    genre: "Life Sim",
    completed: true,
    rating: 5,
  },
];

// figure out how you will deal with new items
//    on a GET request, EJS will render the page with all the new items
//    but what about when you fill out a form to add a new game?
//    should you use JS to add a new item(s), or refresh the page?

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

// don't forget to make these async when you actually use the DB
app.get("/", (req, res) => {
  res.render("index", { games });
});

app.listen(process.env.PORT, () => console.log("server is running"));
