const express = require("express");
const router = express.Router();
const listsController = require("../controllers/listsController");

router.get("/", listsController.getAllLists);

router.get("/my-lists", listsController.getLoggedInUserLists);

router.get("/edit-list", listsController.getListForm);

router.get("/edit-list/:id", listsController.getListForm);

router.get("/:id", listsController.getOneList);

router.post("/new-list", listsController.addNewList);

router.put("/update-list/:id", listsController.updateList);

router.put("/add-list-game/:gameId", listsController.addListGame);

router.delete("/delete-list/:id", listsController.deleteList);

module.exports = router;
