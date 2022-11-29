const express = require("express");
const router = express.Router();
const listsController = require("../controllers/listsController");
const { ensureAuth } = require("../middleware/auth");

// /lists/
// returns list of all lists
router.get("/", listsController.getAllLists);

// /lists/my-lists
// returns list of logged in user's lists
router.get("/my-lists", ensureAuth, listsController.getLoggedInUserLists);

// /lists/edit-list
// returns the list form, fields empty
router.get("/edit-list", ensureAuth, listsController.getListForm);

// /lists/edit-list/:id
// returns the list form, fields filled in
router.get("/edit-list/:id", ensureAuth, listsController.getListForm);

// /lists/:id
// returns the contents of a list
router.get("/:id", listsController.getOneList);

// /lists/new-list
// creates a new list in the DB
router.post("/new-list", ensureAuth, listsController.addNewList);

// /lists/update-list/:id
// updates the data of a list in the DB
router.put("/update-list/:id", ensureAuth, listsController.updateList);

// /lists/like-list/:id
// increments the likes field in a list by 1
router.put("/like-list/:id", ensureAuth, listsController.likeList);

// /lists/add-list-game/:gameId
// appends the gameId value to the games field in the list
router.put("/add-list-game/:gameId", ensureAuth, listsController.addListGame);

// /lists/delete-list/:id
// removes the list from the DB
router.delete("/delete-list/:id", ensureAuth, listsController.deleteList);

// /lists/remove-list-game/:id/:gameId
// removes the gameId from the games array in the list
router.delete(
  "/remove-list-game/:id/:gameId",
  ensureAuth,
  listsController.removeListGame
);

// /lists/list-comment/:id
// add a comment to the list
router.put("/list-comment/:id", ensureAuth, listsController.addComment);

module.exports = router;
