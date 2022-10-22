// Simple program to seed my database with data

require("dotenv").config({ path: "./config/.env" });
const { MongoClient } = require("mongodb");

// Create a new MongoClient
const client = new MongoClient(process.env.DB_STRING);
async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    let db = client.db("video_game_tracker");
    let usersCollection = db.collection("users");
    let listsCollection = db.collection("lists");
    let gamesCollection = db.collection("games");
    let listItemsCollection = db.collection("listitems");
    // let users = await usersCollection.findOne({ email: "bob@bob.com" });
    // let userID = users._id;

    // let options = { projection: { _id: 1 } };

    // let games = await gamesCollection.find({}, options).toArray();

    // let lists = await listsCollection.find({}, options).toArray();

    // let listItems = [];
    // for (let game of games) {
    //   for (let list of lists) {
    //     listItems.push({
    //       gameId: game._id,
    //       listId: list._id,
    //       rating: "Unrated",
    //       completed: "No",
    //     });
    //   }
    // }

    // let result = await listItemsCollection.insertMany(listItems);
    // console.log(result.insertCount);

    let filter = {};

    let updateDoc = {
      $set: {
        image:
          "https://res.cloudinary.com/dvrfafdas/image/upload/v1664577624/v524oiqgy1w0syflt2a3.jpg",
        cloudinaryId: "v524oiqgy1w0syflt2a3",
      },
    };

    let result = await gamesCollection.updateMany(filter, updateDoc);
    console.log("updated games");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// let lists = [
//   { name: "Completed", userId: userID },
//   { name: "Currently Playing", userId: userID },
//   { name: "Quit", userId: userID },
//   { name: "Favorites", userId: userID },
//   { name: "Personal Collection", userId: userID },
// ];

// let games = [
//   {
//     name: "Borderlands",
//     genre: "FPS",
//   },
//   { name: "Cuphead", genre: "Platformer" },
//   {
//     name: "Stardew Valley",
//     genre: "Life Sim",
//   },
//   { name: "Final Fantasy 6", genre: "JRPG" },
//   { name: "Final Fantasy 7", genre: "JRPG" },
//   { name: "Final Fantasy 8", genre: "JRPG" },
//   { name: "Silent Hill", genre: "Horror" },
//   { name: "Resident Evil 4", genre: "Horror" },
//   { name: "Halo: Combat Evolved", genre: "FPS" },
//   { name: "Super Mario World", genre: "Platformer" },
//   { name: "Cities: Skylines", genre: "City Builder" },
//   {
//     name: "The Legend of Zelda: Breath of the Wild",
//     genre: "Action Adventure",
//   },
//   { name: "Metal Gear Solid", genre: "Stealth Action" },
//   { name: "Assassin's Creed 2", genre: "Action" },
//   { name: "Super Metroid", genre: "Metroidvania" },
//   { name: "Castlevania: Symphony of the Night", genre: "Metroidvania" },
//   { name: "Street Figher 2", genre: "Fighting" },
//   { name: "The Witcher 3", genre: "Fantasy" },
//   { name: "Fallout: New Vegas", genre: "Sci-Fi" },
//   { name: "Kirby and the Forgotten Land", genre: "Cute" },
// ];
