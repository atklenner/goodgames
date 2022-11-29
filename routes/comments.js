const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth.js");
const commentsController = require("../controllers/commentsController");

// /comments/like-comment/:id
// increase likes by 1
router.put("/like-comment/:id", commentsController.likeComment);

// /comments/delete-comment/:id
// remove comment from DB
router.delete("/delete-comment/:id", commentsController.deleteComment);

module.exports = router;
