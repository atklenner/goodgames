const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const authController = require("../controllers/authController");

router.get("/", indexController.getHomePage);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
