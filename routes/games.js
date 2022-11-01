const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

router.get("/", gamesController.getAllGames);

router.get("/new-game", gamesController.addGamePage);

router.get("/:id", gamesController.getOneGame);

router.post("/new-game", gamesController.addNewGame);

router.put("/update-game/:id", gamesController.updateGame);

router.delete("/delete-game/:id", gamesController.deleteGame);

module.exports = router;
