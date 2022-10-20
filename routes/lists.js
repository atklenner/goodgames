const express = require("express");
const router = express.Router();
const listsController = require("../controllers/listsController");

router.get("/", listsController.getAllLists);

router.get("/:id", listsController.getOneList);

router.post("/new-list", listsController.addNewList);

router.put("/update-game/:id", listsController.updateList);

router.delete("/delete-game/:id", listsController.deleteList);

module.exports = router;
