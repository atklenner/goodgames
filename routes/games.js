const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const gamesController = require("../controllers/gamesController");
const { ensureAuth } = require("../middleware/auth");

// /games/
// returns list of all games
router.get("/", gamesController.getAllGames);

// /games/edit-game
// returns form of game, empty fields
router.get("/edit-game", ensureAuth, gamesController.addGamePage);

// /games/:id
// returns game page with all reviews and game data
router.get("/:id", gamesController.getOneGame);

// /games/new-game
// creates new game in DB
router.post(
  "/new-game",
  ensureAuth,
  upload.single("image"),
  gamesController.addNewGame
);

// /games/edit-game/:id
// returns game form with fields filled in
router.get("/edit-game/:id", ensureAuth, gamesController.updateGamePage);

// /games/update-game/:id
// update game data in DB
router.put(
  "/update-game/:id",
  ensureAuth,
  upload.single("image"),
  gamesController.updateGame
);

// /games/delete-game/:id
// removes game data from DB
router.delete("/delete-game/:id", ensureAuth, gamesController.deleteGame);

module.exports = router;
