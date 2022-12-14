require("dotenv").config({ path: "./config/.env" });
const { MongoClient } = require("mongodb");

let games = [
  {
    name: "Borderlands",
    genres: ["FPS", "RPG"],
  },
  { name: "Cuphead", genres: ["Platformer"] },
  {
    name: "Stardew Valley",
    genres: ["Simulation"],
  },
  { name: "Final Fantasy 6", genres: ["RPG"] },
  { name: "Final Fantasy 7", genres: ["RPG"] },
  { name: "Final Fantasy 8", genres: ["RPG"] },
  { name: "Silent Hill", genres: ["Action"] },
  { name: "Resident Evil 4", genres: ["Action"] },
  { name: "Halo: Combat Evolved", genres: ["FPS"] },
  { name: "Super Mario World", genres: ["Platformer"] },
  { name: "Cities: Skylines", genres: ["Simulation", "Strategy"] },
  {
    name: "The Legend of Zelda: Breath of the Wild",
    genres: ["Action", "Adventure"],
  },
  { name: "Metal Gear Solid", genres: ["Action"] },
  { name: "Assassin's Creed 2", genres: ["Action"] },
  { name: "Super Metroid", genres: ["Adventure", "Platformer"] },
  { name: "Castlevania: Symphony of the Night", genres: ["Adventure", "Platformer"] },
  { name: "Street Figher 2", genres: ["Fighting"] },
  { name: "The Witcher 3", genres: ["Action", "RPG"] },
  { name: "Fallout: New Vegas", genres: ["Action", "RPG"] },
  { name: "Kirby and the Forgotten Land", genres: ["Action", "Platformer"] },
];
// let image = "https://res.cloudinary.com/dvrfafdas/image/upload/v1669920387/qi0ueaydyjn6zn4b1f8e.png";
// let cloudinaryId = "qi0ueaydyjn6zn4b1f8e";
let image = "";
let cloudinaryId = "";
// Simple program to seed my database with data

// Create a new MongoClient
const client = new MongoClient(process.env.DB_STRING);
async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    let db = client.db("video_game_tracker");
    let gamesCollection = db.collection("games");
    gamesCollection.createIndex({ name: 1 });

    for (let game of games) {
      await gamesCollection.insertOne({
        name: game.name,
        genres: game.genres,
        dateReleased: Date.now(),
        developer: "N/A",
        publisher: "N/A",
        rating: "Rating Pending",
        image,
        cloudinaryId,
      })
    }

    console.log("updated games");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
