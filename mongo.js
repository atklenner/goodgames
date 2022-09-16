// Simple program to seed my database with data

require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

let db, gamesCollection;

MongoClient.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("connected to db");
    db = client.db("video_game_tracker");
    gamesCollection = db.collection("games");

    let games = [
      {
        name: "Borderlands",
        genre: "FPS",
        completed: "Yes",
        rating: "Really Liked It",
      },
      { name: "Cuphead", genre: "Platformer", completed: "Playing" },
      {
        name: "Stardew Valley",
        genre: "Life Sim",
        completed: "Yes",
        rating: "Loved It",
      },
    ];

    games.forEach(async (game) => {
      try {
        let res = await gamesCollection.insertOne(game);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    });
  })
  .catch((error) => console.error(error));
