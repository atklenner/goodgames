require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
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

app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

// don't forget to make these async when you actually use the DB
app.get("/", (req, res) => {
  res.render("index", { games });
});

app.post("/api/new-game", (req, res) => {
  console.log(req.body);
  let newGame = {
    name: req.body.name,
    genre: req.body.genre,
    rating: req.body.rating,
    completed: req.body.completed || false,
  };
  games.push(newGame);
  res.redirect("/");
});

app.put("/api/update-game/:id", (req, res) => {});

app.delete("/api/delete-game/:id", (req, res) => {});

app.listen(process.env.PORT, () => console.log("server is running"));
