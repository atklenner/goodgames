const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsController");
const { ensureAuth } = require("../middleware/auth");

// /reviews/edit-review/:id
// gets the review form, fields filled in if the review exists
router.get("/edit-review/:id", ensureAuth, reviewsController.addReviewPage);

// /reviews/:id
// returns the review page
router.get("/:id", reviewsController.getReview);

// /reviews/new-review/:gameId
// creates a new review in the DB
router.post("/new-review/:gameId", ensureAuth, reviewsController.addReview);

// /reviews/update-review/:id
// updates the review data in the DB
router.put("/update-review/:id", ensureAuth, reviewsController.updateReview);

// /reviews/like-review/:id
// increments the likes field in the review model by 1
router.put("/like-review/:id", ensureAuth, reviewsController.likeReview);

// /reviews/delete-review/:id
// removes review from DB
router.delete("/delete-review/:id", ensureAuth, reviewsController.deleteReview);

module.exports = router;
