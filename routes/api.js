const express = require("express");
const router = express.Router();

router.post("/new-game", apiController.addNewGame);

router.put("/update-game/:id", apiController.updateGame);

router.delete("/delete-game/:id", apiController.deleteGame);

module.exports = router;
