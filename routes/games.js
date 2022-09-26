const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

router.post("/new-game", gamesController.addNewGame);

router.put("/update-game/:id", gamesController.updateGame);

router.delete("/delete-game/:id", gamesController.deleteGame);

module.exports = router;
