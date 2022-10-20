const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getOneUser);

module.exports = router;
